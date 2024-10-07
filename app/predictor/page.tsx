"use client";

import { Combobox } from "@/components/Combobox";
import mobileData from "../data/data";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import getPriceEstimate from "./priceEstimateHelper";
import { useRouter } from "next/navigation";

interface Option {
  label: string;
  value: string;
}

const PredictorPage = () => {
  const [brandsList, setBrandsList] = useState<Option[]>([]);
  const [conditionList, setConditionList] = useState<Option[]>([]);
  const [modelList, setModelList] = useState<Option[]>([]);
  const [osList, setOsList] = useState<Option[]>([]);
  const [colorList, setColorList] = useState<Option[]>([]);
  const router = useRouter();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    os: "",
    color: "",
    condition: "",
    ram: undefined as number | undefined,
    storage: undefined as number | undefined,
    cameraResolution: undefined as number | undefined,
    screenSize: undefined as number | undefined,
  });

  const handleBrandSelect = (val: string) => {
    setForm({ ...form, brand: val, model: "" });

    const currentBrandPhones = mobileData.filter((m) => m.brand === val);

    const models = Array.from(new Set(currentBrandPhones.map((m) => m.name))).map((b) => ({
      label: b,
      value: b,
    }));

    const os = Array.from(new Set(currentBrandPhones.map((m) => m.operating_system.toString()))).map((b) => ({
      label: b,
      value: b,
    }));

    const colors = Array.from(new Set(currentBrandPhones.map((m) => m.color.toString()))).map((b) => ({
      label: b,
      value: b,
    }));

    setModelList(models);
    setOsList(os);
    setColorList(colors);
  };

  const getFinalPriceEstimate = async () => {
    if (
      !form.brand ||
      !form.model ||
      !form.os ||
      !form.color ||
      !form.condition ||
      !form.ram ||
      !form.storage ||
      !form.cameraResolution ||
      !form.screenSize
    ) {
      return;
    }

    const price = await getPriceEstimate(
      form.model,
      form.brand,
      form.ram,
      form.storage,
      form.cameraResolution,
      form.os,
      form.screenSize,
      form.condition,
      form.color
    );

    router.push(`/estimated-price?price=${price}&name=${form.model}`);
  };

  useEffect(() => {
    let brands = Array.from(new Set(mobileData.map((m) => m.brand))).map((b) => ({ label: b, value: b }));
    let conditions = Array.from(new Set(mobileData.map((m) => m.condition))).map((b) => ({ label: b, value: b }));
    setBrandsList(brands);
    setConditionList(conditions);
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <div className="w-1/2 flex flex-col gap-5 bg-gray-950 border border-gray-900 p-20 rounded-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Add Your Phone's Details</h1>
        {/* <div className="border-b-[0.5px] w-40"></div> */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300">Brand</p>
          <Combobox
            value={form.brand}
            options={brandsList || []}
            onSelect={handleBrandSelect}
            className="w-full"
            clearable
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300">Model</p>
          <Combobox
            value={form.model}
            options={modelList || []}
            onSelect={(val) => {
              setForm({ ...form, model: val });
            }}
            className="w-full"
            clearable
            disabled={form.brand ? false : true}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300">Operating System</p>
          <Combobox
            value={form.os}
            options={osList || []}
            onSelect={(val) => {
              setForm({ ...form, os: val });
            }}
            className="w-full"
            clearable
            disabled={form.brand ? false : true}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300">Condition</p>
          <Combobox
            value={form.condition}
            options={conditionList || []}
            onSelect={(val) => {
              setForm({ ...form, condition: val });
            }}
            className="w-full"
            clearable
          />
        </div>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-300">Ram &#40;GB&#41;</p>
            <Input
              value={form.ram}
              onChange={(e) => {
                setForm({ ...form, ram: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full"
            />
          </div>

          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-300">Storage &#40;GB&#41;</p>
            <Input
              value={form.storage}
              onChange={(e) => {
                setForm({ ...form, storage: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-300">Camera Resolution &#40;MP&#41;</p>
            <Input
              value={form.cameraResolution}
              onChange={(e) => {
                setForm({ ...form, cameraResolution: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full"
            />
          </div>

          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-300">Screen Size &#40;inches&#41;</p>
            <Input
              value={form.screenSize}
              onChange={(e) => {
                setForm({ ...form, screenSize: e.target.value ? parseInt(e.target.value) : undefined });
              }}
              className="w-full"
              step="0.1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-300">Color</p>
          <Combobox
            value={form.color}
            options={colorList || []}
            onSelect={(val) => {
              setForm({ ...form, color: val });
            }}
            className="w-full"
            clearable
            disabled={form.brand ? false : true}
          />
        </div>

        <div className="flex justify-end mt-5">
          <Button onClick={getFinalPriceEstimate}>Estimate Price</Button>
        </div>
      </div>
    </div>
  );
};

export default PredictorPage;
