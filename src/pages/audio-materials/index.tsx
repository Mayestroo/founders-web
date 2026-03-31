"use client";
import AudioMaterialsLibrary from "@/components/AudioMaterialsLibrary";
import Header from "@/components/Header";

export default function AudioMaterialsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <AudioMaterialsLibrary />
    </main>
  );
}
