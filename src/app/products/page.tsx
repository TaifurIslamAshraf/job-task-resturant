import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import Cart from "@/components/Cart";
import Loading from "@/components/loading/Loading";
import Navbar from "@/components/Navbar";
import Sidebar, { ICategory } from "@/components/Sidebar";
import Warning from "@/components/Warning";
import { getCache, setCache } from "@/lib/cache";
import secret from "@/lib/secret";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: ICategory;
  isActive: boolean;
  order: number;
  count: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

async function getProducts() {
  try {
    const cachedProducts = await getCache<IProduct[]>();
    if (cachedProducts?.length) {
      return cachedProducts;
    }

    const res = await fetch(`${secret.publicUrl}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const products = await res.json();
    await setCache(products);
    return products;
  } catch (error) {
    console.error("Product fetch error:", error);
    return [];
  }
}

export default async function Products() {
  return (
    <div className="min-h-screen  lg:pt-6 pt-0">
      <Navbar />
      {/* Add mobile banner here */}
      <div className="block lg:hidden !px-0">
        <Banner />
      </div>

      {/* Add mobile category here */}
      <div className="block lg:hidden w-full sticky top-16 left-0 right-0 bg-mprimry z-40">
        <Sidebar isMobile={true} />
      </div>
      <div className="lg:mt-20 mt-0 md:px-8 px-3 lg2:px-20 lg:flex block gap-8">
        {/* Desktop sidebar */}
        <div className="lg:w-[230px] overflow-x-auto lg:flex-shrink-0">
          <Sidebar isMobile={false} />
        </div>

        <main className="flex-1 py-4 lg:space-y-10 space-y-0 min-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="lg:block hidden">
            <Banner />
          </div>
          <Warning />
          <Suspense fallback={<Loading />}>
            <ProductList />
          </Suspense>
        </main>

        <div className="max-w-[320px] 2xl:block hidden w-full flex-shrink-0">
          <Cart />
        </div>
      </div>
    </div>
  );
}

async function ProductList() {
  const products = await getProducts();
  return <AllProducts products={products} />;
}
