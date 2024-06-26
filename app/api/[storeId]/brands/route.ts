import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name field is empty", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId param is empty", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UNAUTHORIZED", { status: 403 });
    }

    const brand = await prismadb.brand.create({
      data: {
        name,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// fetching all brandss
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const brands = await prismadb.brand.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.log("[BRANDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
