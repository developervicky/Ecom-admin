import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { Product } from "@prisma/client";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const {
      items,
      totalCost: totalPrice,
    }: { items: Product[]; totalCost: number } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("Order Item required", { status: 400 });
    }

    const productIds = items.map((item) => item.id);

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    items.forEach((product) => {
      line_items.push({
        quantity: product.cartCount!,
        price_data: {
          currency: "INR",
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price) * 100,
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        totalPrice: totalPrice,
        orderItem: {
          create: items.map((item) => ({
            orderedProduct: {
              create: {
                name: item.name,
                cartCount: item.cartCount,
                product: {
                  connect: {
                    id: item.id,
                  },
                },
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancelled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeader });
  } catch (error) {
    console.log(error);
  }
}
