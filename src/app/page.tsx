import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl font-semibold">Please check all page</h1>
      <div className="flex justify-center items-center gap-4">
        <Button className="bg-green-500">
          <Link href="/products">Products</Link>
        </Button>
        <Button>
          <Link href="/create-products">Create products</Link>
        </Button>
        <Button>
          <Link href="/category">Category</Link>
        </Button>
      </div>
    </div>
  );
}
