"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { School } from "@prisma/client"

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="schools" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} dataId={row.original.id}/>,
  },
]
