import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";

// Lazy load heavy component to improve initial page load
const LevelSelection = dynamic(
  () => import("@/components/LevelSelection"),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

export default function ChooseLevelPage() {
  return (
    <>
      <Header />
      <LevelSelection />
      <Footer />
    </>
  );
}
