"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ParentsSolutionsChallenges from "@/components/ParentsSolutionsChallenges";
import ParentsSolutionsHero from "@/components/ParentsSolutionsHero";
import ParentsSolutionsSolution from "@/components/ParentsSolutionsSolution";

export default function ParentsSolutionsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <ParentsSolutionsHero />
      <ParentsSolutionsChallenges />
      <ParentsSolutionsSolution />
      <Footer />
    </main>
  );
}
