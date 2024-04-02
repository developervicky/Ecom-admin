import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; brandId: string } },
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
    if (!params.brandId) {
      return new NextResponse("brandId param is empty", { status: 400 });
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

    const brand = await prismadb.brand.updateMany({
      where: {
        id: params.brandId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("BRAND_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; brandId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId param is empty", { status: 400 });
    }
    if (!params.brandId) {
      return new NextResponse("BrandId param is empty", { status: 400 });
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

    const brand = await prismadb.brand.deleteMany({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } },
) {
  try {
    if (!params.brandId) {
      return new NextResponse("brandId param is empty", { status: 400 });
    }

    const brand = await prismadb.brand.findUnique({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[GET_BRAND]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
