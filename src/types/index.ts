export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    category: string;
    categorySlug: string;
    brand?: string;
    image: string;
    images?: string[];
    rating: number;
    reviewCount: number;
    badge?: "new" | "bestseller" | "limited";
    variants?: ProductVariant[];
    description: string;
    inStock: boolean;
    /** Units currently in stock. Omit if unlimited. Below 5 shows low-stock warning. */
    stockCount?: number;
}

export interface ProductVariant {
    name: string;
    type: "color" | "size";
    value: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    productCount: number;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
    product: string;
}

export interface Brand {
    id: string;
    name: string;
    logo: string;
}

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}
