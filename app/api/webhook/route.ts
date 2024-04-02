import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.country,
    address?.postal_code,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(",");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItem: {
          include: {
            orderedProduct: true,
          },
        },
      },
    });

    const productIds = order.orderItem
      .map((item) => {
        if (item.orderId === session?.metadata?.orderId) {
          return item;
        } else {
          return;
        }
      })
      .map((product) => {
        if (product) {
          return product.id;
        } else {
          return;
        }
      });

    //   To update the product stock count and if its emptied then Isarchived have to turn to true

    //     await prismadb.product.updateMany({
    //       where: {
    //         id: {
    //           in: [...productIds],
    //         },
    //       },
    //     });
  }

  console.log("completed")

  return new NextResponse(null, { status: 200 });
}
