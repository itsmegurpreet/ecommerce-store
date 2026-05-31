import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface LineItem {
    name: string;
    price: number; // in INR (rupees)
    quantity: number;
    image: string;
}

interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

interface CreateSessionBody {
    items: LineItem[];
    shipping: number; // in INR
    deliveryMethod: "standard" | "express";
    customer: Customer;
}

export async function POST(req: NextRequest) {
    let body: CreateSessionBody;

    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { items, shipping, deliveryMethod, customer } = body;

    if (!items?.length || !customer?.email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build the origin for success/cancel URLs
    const origin =
        req.headers.get("origin") ??
        process.env.NEXT_PUBLIC_SITE_URL ??
        "http://localhost:3000";

    // Build Stripe line items — amounts are in paise (INR × 100)
    const lineItems = items.map((item) => {
        // Only include images that are absolute URLs (relative paths won't load for Stripe)
        const images = item.image.startsWith("http") ? [item.image] : [];

        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    ...(images.length > 0 && { images }),
                },
                // price in paise: round to avoid floating-point issues
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        };
    });

    // Add shipping as a separate line item if applicable
    if (shipping > 0) {
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name:
                        deliveryMethod === "express"
                            ? "Express Delivery (1–2 business days)"
                            : "Standard Delivery (3–6 business days)",
                },
                unit_amount: Math.round(shipping * 100),
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        customer_email: customer.email,
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
        payment_method_types: ["card"],
        metadata: {
            customer_name: customer.name,
            phone: customer.phone,
            shipping_address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pincode,
            delivery_method: deliveryMethod,
        },
    });

    if (!session.url) {
        return NextResponse.json(
            { error: "Failed to create payment session" },
            { status: 500 }
        );
    }

    return NextResponse.json({ url: session.url });
}
