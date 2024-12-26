/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from "@/model/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ order: 1 });
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await Product.create(data);
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
