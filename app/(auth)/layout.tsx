import { ReactNode } from "react";
import Hero from "./(routes)/components/Hero";
import Footer from "@/components/Footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="flex min-h-screen flex-col items-center justify-normal lg:flex-row lg:justify-between">
        <Hero />
        <div className="flex flex-[0.55]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
