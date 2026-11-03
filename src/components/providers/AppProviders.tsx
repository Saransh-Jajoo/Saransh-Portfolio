"use client";

import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AmbientWorldCanvas } from "@/graphics/components/AmbientWorldCanvas";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientWorldCanvas />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
