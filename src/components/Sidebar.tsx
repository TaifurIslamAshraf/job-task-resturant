import secret from "@/lib/secret";
import { ArrowLeft } from "lucide-react";
import Category from "./Category";

export interface ICategory {
  _id: string;
  name: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

const Sidebar = async ({ isMobile }: { isMobile?: boolean }) => {
  const data = await fetch(`${secret.publicUrl}/api/categories`);
  const categories: ICategory[] = await data.json();

  if (isMobile) {
    return (
      <div className="py-2 px-2 overflow-x-auto z-50 w-full">
        <Category category={categories} />
      </div>
    );
  }

  return (
    <div className="max-w-[230px] hidden lg:block w-full py-4 fixed h-[calc(100vh-100px)] overflow-x-auto">
      <div className="flex items-center gap-1 text-sm bg-white rounded-2xl p-4 whitespace-nowrap">
        <ArrowLeft className="h-5 w-5 flex-shrink-0" />
        <span>All restaurants</span>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold my-3 whitespace-nowrap">Menu</h1>
        <div className="overflow-x-auto">
          <Category category={categories} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
