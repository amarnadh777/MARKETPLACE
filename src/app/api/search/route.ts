import { NextResponse } from "next/server";
import { products } from "@/lib/data/products"; // adjust path if needed

// GET /api/products?query=helmet
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  // filter products by name, category, vendor, etc.
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.subCategory.toLowerCase().includes(query) ||
      p.vendor.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}
