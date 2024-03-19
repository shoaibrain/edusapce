"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Student } from "@prisma/client"

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("firstName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("lastName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("gender")}</div>,
    enableSorting: true,
    enableHiding: true,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "enrollmentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" Status" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("enrollmentStatus")}</div>,
    enableSorting: true,
    enableHiding: true,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "currentGradeLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grade Level" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("currentGradeLevel")}</div>,
    enableSorting: false,
    enableHiding: true,

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} dataId={row.original.id}/>,
  },
]
