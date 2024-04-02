"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { FC } from "react";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BrandsColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";

interface BrandsClientProps {
  data: BrandsColumn[];
}

const BrandsClient: FC<BrandsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Brands (${data.length})`}
          description="Manage brands for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Brands" />
      <Separator />
      <ApiList entityName="brands" entityIdName="brandId" />
    </>
  );
};

export default BrandsClient;
