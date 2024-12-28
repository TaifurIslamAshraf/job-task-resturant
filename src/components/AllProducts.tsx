"use client";

import { IProduct } from "@/app/products/page";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";

type Props = {
  products: IProduct[];
};

const CategorySection: FC<{
  category: string;
  products: IProduct[];
  categoryId: string;
}> = ({ category, products, categoryId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", categoryId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [inView, categoryId, router, searchParams]);

  return (
    <div
      className="mt-8"
      ref={ref}
      id={category.toLowerCase().replace(/\s+/g, "-")}
    >
      <h1
        className={`font-bold text-xl md:text-2xl lg:text-3xl mb-4 ${
          inView ? "opacity-100" : "opacity-50"
        }`}
      >
        {category}
      </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products &&
          products?.map((product) => {
            if (product.category.name === category) {
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl p-3 h-[358px] w-full flex flex-col justify-between gap-4"
                >
                  <div className="mx-auto">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={190}
                      height={170}
                      className="object-cover rounded-lg h-[170px]"
                    />
                    <h1 className="text-xl font-semibold text-primary mt-1 ">
                      ${product.price}
                    </h1>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                  <Button className="flex items-center justify-center w-full bg-mprimry text-primary hover:bg-mprimry/90 py-6 rounded-xl">
                    <Plus size={30} />
                    <span>Add</span>
                  </Button>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

const AllProducts: FC<Props> = ({ products }) => {
  const categories = products?.map((product) => ({
    id: product.category._id,
    name: product.category.name,
  }));

  const uniqueCategories = Array.from(
    new Map(categories?.map((item) => [item.name, item])).values()
  );

  return (
    <div>
      {uniqueCategories?.map((category) => (
        <CategorySection
          key={category.name}
          category={category.name}
          categoryId={category.id}
          products={products}
        />
      ))}
    </div>
  );
};

export default AllProducts;
