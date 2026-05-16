"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import dynamic from "next/dynamic";

// Below fold - lazy load with no SSR to reduce initial JS
const About = dynamic(() => import("@/components/About"), { 
  loading: () => <div className="h-96 bg-linear-to-b from-white to-[#FFE6EB]" />
});
const Teachers = dynamic(() => import("@/components/Teachers"), { 
  loading: () => <div className="h-96 bg-white" />
});
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { 
  loading: () => <div className="h-64 bg-white" />
});
const Promotions = dynamic(() => import("@/components/Promotions"), {
  loading: () => <div className="h-64 bg-white" />
});
const JoinTeam = dynamic(() => import("@/components/JoinTeam"), { 
  loading: () => <div className="h-64 bg-white" />
});
const Services = dynamic(() => import("@/components/Services"), { 
  loading: () => <div className="h-64 bg-white" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-64 bg-white" />
});
const Materials = dynamic(() => import("@/components/Materials"), { 
  loading: () => <div className="h-64 bg-white" />
});
const FAQ = dynamic(() => import("@/components/FAQ"), { 
  loading: () => <div className="h-64 bg-white" />
});
const Footer = dynamic(() => import("@/components/Footer"), { 
  loading: () => <div className="h-64 bg-[#00192d]" />
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Teachers />
      <WhyChooseUs />
      <Promotions />
      <JoinTeam />
      <Services />
      <Testimonials />
      <Materials />
      <FAQ />
      <Footer />
    </main>
  );
}
