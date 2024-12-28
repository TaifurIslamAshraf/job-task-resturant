"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { ICategory } from "./Sidebar";

type IProps = {
  category: ICategory[];
};

const Category: FC<IProps> = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (
    e: React.MouseEvent,
    categoryId: string,
    categoryName: string
  ) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId);
    router.replace(`?${params.toString()}`, { scroll: false });

    const element = document.getElementById(
      categoryName.toLowerCase().replace(/\s+/g, "-")
    );
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div className="hidden lg:block">
        {category.map((item) => (
          <div
            key={item._id}
            onClick={(e) => handleCategoryClick(e, item._id, item.name)}
            className={`cursor-pointer rounded-2xl transition-colors py-3 px-4 text-sm ${
              currentCategory === item._id ? "bg-white" : "hover:bg-gray-50"
            }`}
          >
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* mobile device */}
      <div className="flex lg:hidden overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {category.map((item) => (
          <div
            key={item._id}
            onClick={(e) => handleCategoryClick(e, item._id, item.name)}
            className={`cursor-pointer rounded-2xl transition-colors py-3 px-4 text-sm whitespace-nowrap ${
              currentCategory === item._id ? "bg-white" : "hover:bg-gray-50"
            }`}
          >
            <span className="whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
