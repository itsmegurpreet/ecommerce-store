import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedCategories } from "@/components/sections/FeaturedCategories";
import { BestSellersCarousel } from "@/components/sections/BestSellersCarousel";
import { StoryBanner } from "@/components/sections/StoryBanner";
import { TrustSection } from "@/components/sections/TrustSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewArrivalsSection } from "@/components/sections/NewArrivalsSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturedCategories />
            <BestSellersCarousel />
            <StoryBanner />
            <TrustSection />
            <TestimonialsSection />
            <NewArrivalsSection />
        </>
    );
}
