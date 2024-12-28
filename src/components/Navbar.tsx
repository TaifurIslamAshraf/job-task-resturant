"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Bookmark, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./Language";
import SelectLocation from "./SelectLocation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          "fixed inset-0 w-full h-20 hidden lg:flex items-center justify-between px-8 border-b border-bprimary bg-mprimry z-50",
          isScrolled && "shadow-lg"
        )}
      >
        <div className="flex items-center space-x-4">
          <Link href="/" className="">
            <Image src="/logo.svg" alt="logo" width={40} height={77} />
          </Link>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search a product"
                className="lg:w-[330px] w-full pl-10 pr-4 py-[22px] border-2 border-bprimary rounded-2xl outline-none focus-visible:ring-0 bg-white"
              />
            </div>
          </div>
          <SelectLocation />
        </div>
        <div className="flex items-center gap-6">
          <Language />
          <Button className="bg-bprimary text-black font-semibold py-6 px-6 hover:bg-bprimary/60 rounded-2xl text-base shadow-none">
            Log in
          </Button>
        </div>
      </nav>

      {/* mobile device */}
      <nav
        className={cn(
          "fixed inset-0 w-full h-16 bg-transparent flex lg:hidden items-center justify-between px-6 z-50",
          isScrolled && "bg-mprimry"
        )}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
          <Link href={"/"}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <Bookmark className="h-6 w-6" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            <Search className="h-6 w-6" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
