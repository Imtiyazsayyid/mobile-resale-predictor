"use client";

import * as React from "react";
import { ArrowDown, Check, ChevronDown, ChevronsDown, ChevronsUpDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandList } from "cmdk";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
  clearable?: boolean;
  width?: number;
  className?: string;
  dropDownClassName?: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  onSelect,
  clearable,
  width,
  className,
  disabled,
  dropDownClassName,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`min-w-fit h-9 m-0 justify-between cursor-pointer ${className}`}
          >
            <div>{value ? options.find((framework) => framework.value === value)?.label : ""}</div>
            <div className="flex gap-2">
              {clearable && value && (
                <XIcon
                  size={14}
                  className="text-slate-400 hover:text-black dark:text-stone-600 dark:hover:text-white transition-all cursor-pointer ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect("");
                  }}
                />
              )}
              {/* <ChevronDown className="h-4 w-4 shrink-0 opacity-50" /> */}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`min-w-96 border-gray-800 p-0 ${dropDownClassName}`}>
          <Command>
            <CommandInput placeholder="Choose Option..." className="overflow-hidden" />
            {/* {options.length === 0 && (
              <div className="flex justify-center items-center w-full p-3 pt-5">
                <p className="text-sm">No Results Found.</p>
              </div>
            )} */}
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandList className="max-h-40 overflow-hidden overflow-y-auto">
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.label}
                  onSelect={() => {
                    onSelect(framework.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
