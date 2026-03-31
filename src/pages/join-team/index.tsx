"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JoinTeam from "@/components/JoinTeam";
import JoinTeamFaq from "@/components/JoinTeamFaq";
import JoinTeamHiringProcess from "@/components/JoinTeamHiringProcess";
import JoinTeamVacancies from "@/components/JoinTeamVacancies";
import JoinTeamWhoWeSeek from "@/components/JoinTeamWhoWeSeek";
import JoinTeamWhyFounders from "@/components/JoinTeamWhyFounders";

export default function JoinTeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <JoinTeam />
      <JoinTeamVacancies />
      <JoinTeamHiringProcess />
      <JoinTeamWhoWeSeek />
      <JoinTeamWhyFounders />
      <JoinTeamFaq />
      <Footer />
    </main>
  );
}
