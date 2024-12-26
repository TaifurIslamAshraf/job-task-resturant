import Category from "@/model/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await Category.find().sort({ order: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories", errorDetails: error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const category = await Category.create(data);
    return NextResponse.json(category);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
