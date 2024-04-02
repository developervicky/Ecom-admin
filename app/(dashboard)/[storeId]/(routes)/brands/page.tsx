import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import BrandsClient from "./components/BrandsClient";
import { BrandsColumn } from "./components/Columns";

const BrandsPage = async ({ params }: { params: { storeId: string } }) => {
  const brands = await prismadb.brand.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBrands: BrandsColumn[] = brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    createdAt: format(brand.createdAt, "MMMM do, yyyy - KK:mm aaa"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandsClient data={formattedBrands} />
      </div>
    </div>
  );
};

export default BrandsPage;
