import { User } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";

const cartData = [];

const Cart = () => {
  return (
    <div className="max-w-[320px] w-full fixed h-[calc(100vh-100px)] bg-white rounded-2xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      {cartData?.length > 0 ? (
        <div className="h-[calc(100%-80px)] overflow-y-auto">
          {/* Cart items will go here */}
        </div>
      ) : (
        <div className="h-[calc(100%-110px)] flex flex-col items-center justify-center space-y-4">
          <Image
            className="mx-auto"
            src={"/empty-cart.svg"}
            alt="Empty cart"
            width={100}
            height={100}
          />
          <h1 className="text-lg font-semibold capitalize text-center">
            Your cart is currently empty
          </h1>
        </div>
      )}

      <div className="w-full space-y-4">
        <Separator className="w-full" />
        <div className="flex items-center gap-2">
          <div className="bg-mprimry p-3 rounded-xl">
            <User />
          </div>
          <h1 className="text-sm text-red-300">Out of delivery zone</h1>
        </div>
      </div>
    </div>
  );
};

export default Cart;
