"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type BrandsColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<BrandsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
