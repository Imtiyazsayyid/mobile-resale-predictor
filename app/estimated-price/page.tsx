"use client";

import { useSearchParams } from "next/navigation";
import AnimatedNumbers from "react-animated-numbers";
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";

export default function EstimatedPrice() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price") || undefined;
  const name = searchParams.get("name") || undefined;

  return (
    <div className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.5] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight className="left-96 -top-0" fill="white" />
      <div className=" p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0">
        <div className="flex flex-col gap-5 w-full items-center">
          <h1 className="text-2xl font-bold text-gray-400">
            Your <span className="text-white">{name}</span> is Worth
          </h1>
          <div className="text-9xl font-bold flex gap-2 items-center">
            $
            {price && (
              <AnimatedNumbers
                includeComma
                // className={}
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.0000001,
                })}
                animateToNumber={parseFloat(parseFloat(price).toFixed(2))}
                fontStyle={{
                  fontSize: 100,
                  color: "white",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
