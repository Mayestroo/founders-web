import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TestProvider } from "@/context/TestContext";
import Spinner from "@/components/Spinner";

// Lazy load test component to improve initial page load
const MemoryTestKids = dynamic(
  () => import("@/components/tests/MemoryTestKids"),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

export default function MemoryKidsPage() {
  return (
    <TestProvider>
      <Header />
      <main className="min-h-screen bg-white py-8">
        <MemoryTestKids />
      </main>
      <Footer />
    </TestProvider>
  );
}
