import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TestProvider } from "@/context/TestContext";
import Spinner from "@/components/Spinner";

// Lazy load test component to improve initial page load
const IQTestKids = dynamic(
  () => import("@/components/tests/IQTestKids"),
  {
    loading: () => <Spinner />,
    ssr: false,
  }
);

export default function IQKidsPage() {
  return (
    <TestProvider>
      <Header />
      <main className="min-h-screen bg-white py-8">
        <IQTestKids />
      </main>
      <Footer />
    </TestProvider>
  );
}
