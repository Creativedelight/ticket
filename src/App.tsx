import React from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { EventsSection } from "./pages/EventsSection"; // ✅ import new section

export function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <EventsSection /> {/* ✅ fetch & show real events */}
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
