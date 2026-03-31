"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import dynamic from "next/dynamic";

// Below fold - lazy load with no SSR to reduce initial JS
const About = dynamic(() => import("@/components/About"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gradient-to-b from-white to-[#FFE6EB]" />
});
const Teachers = dynamic(() => import("@/components/Teachers"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-white" />
});
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const Promotions = dynamic(() => import("@/components/Promotions"), {
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const JoinTeam = dynamic(() => import("@/components/JoinTeam"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const Services = dynamic(() => import("@/components/Services"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const Materials = dynamic(() => import("@/components/Materials"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const FAQ = dynamic(() => import("@/components/FAQ"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-white" />
});
const Footer = dynamic(() => import("@/components/Footer"), { 
  ssr: false,
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
