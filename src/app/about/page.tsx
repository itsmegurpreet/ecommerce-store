import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutNumbers } from "@/components/sections/about/AboutNumbers";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
    title: "About",
    description:
        "We started SmartDeskHub because we were tired of sorting through mediocre products. We built the store we wished existed.",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutMission />
            <AboutValues />
            <AboutStory />
            <AboutNumbers />
            <AboutTeam />
            <AboutCTA />
        </>
    );
}
