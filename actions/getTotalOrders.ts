import prismadb from "@/lib/prismadb";

export const getTotalOrders = async (storeId: string) => {
  const TotalOrders = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return TotalOrders;
};
