"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.3] bg-grid-small-black/[0.4] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex flex-col gap-5 items-center">
        <p className="text-center font-bold">Aditi Krishnan's</p>
        <h1 className="text-7xl font-bold text-center mb-5">
          Mobile Resale <br /> Price Predictor
        </h1>
        <Button className="w-fit" onClick={() => router.push("/predictor")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
