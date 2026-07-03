import BackendWarmup from "@/components/landing/BackendWarmup";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import BottomCTA from "@/components/landing/BottomCTA";

export default function Home() {
  return (
    <main className="flex-1">
      <BackendWarmup/>
      <Hero />
      <Features />
      <HowItWorks />
      <BottomCTA />
    </main>
  );
}