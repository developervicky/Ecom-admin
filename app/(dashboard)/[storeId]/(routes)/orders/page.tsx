import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import OrderClient from "./components/OrderClient";
import { OrderColumn } from "./components/Columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItem: {
        include: {
          orderedProduct: {
            include: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log(orders);

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItem
      .map((orderItem) =>
        orderItem.orderedProduct.map(
          (product) => product.name + `(${product.cartCount}No)`,
        ),
      )
      .join(", "),
    totalPrice: formatter.format(order.totalPrice!.toNumber()),
    createdAt: format(order.createdAt, "MMMM do, yyyy - KK:mm aaa"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
