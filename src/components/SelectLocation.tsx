"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

const SelectLocation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="border-2 border-bprimary rounded-2xl w-full py-[10px] px-3 flex items-center justify-between gap-1 hover:bg-bprimary">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 font-normal" />
            Select your location
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-2xl w-[260px]">
          <DropdownMenuItem className="flex items-center justify-between cursor-pointer gap-2 py-3 px-3 bg-mprimry rounded-2xl  font-semibold text-md">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 font-normal text-red-400" />
              <span>Where to?</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectLocation;
