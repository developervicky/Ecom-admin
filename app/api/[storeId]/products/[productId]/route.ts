import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      description,
      categoryId,
      colorId,
      sizeId,
      brandId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!name || !price || !categoryId || !colorId || !sizeId || !brandId) {
      return new NextResponse("Input field is empty", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are empty", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("StoreId param is empty", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("productId param is empty", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        description,
        categoryId,
        colorId,
        sizeId,
        brandId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("PRODUCT_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UNAUTHENTICATED", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId param is empty", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("productId param is empty", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse("productId param is empty", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        brand: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[GET_PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
