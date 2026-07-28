"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalysePrincipes from "@/components/AnalysePrincipes";

export default function AnalysePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AnalysePrincipes />
      </main>
      <Footer />
    </>
  );
}
