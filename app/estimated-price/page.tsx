"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const EstimatedPrice = () => {
  const searchParams = useSearchParams();
  const price = searchParams.get("price") || undefined;
  const name = searchParams.get("name") || undefined;

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-4 bg-black">
      <h1 className="text-2xl font-bold text-gray-500">
        Your <span className="text-white">{name}</span> is Worth
      </h1>
      <h1 className="text-9xl font-bold">${price ? parseFloat(price).toFixed(2) : ""}</h1>
    </div>
  );
};

export default EstimatedPrice;
