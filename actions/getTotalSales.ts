import prismadb from "@/lib/prismadb";

export const getTotalSales = async (storeId: string) => {
  const paidSales = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItem: {
        include: {
          orderedProduct: true,
        },
      },
    },
  });

  const TotalSales = paidSales
    .flatMap((sale) => sale.orderItem)
    .flatMap((product) => product.orderedProduct)
    .reduce((total, count) => {
      return total + count.cartCount;
    }, 0);

  return TotalSales;
};
