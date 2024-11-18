import { ColumnDef } from "@tanstack/react-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { useState } from "react";
import { useGetUserById } from "../../../queries/queries";



export type Order = {
    orderId: string;
    userId: string;
    productId: string[];
    orderDate: string; // ISO format date
    totalPrice: number;
    orderStatus: string;
    shippingAddress: string;
    billingAddress: string;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => {
            return (
                <>{"ORD" + row.getValue("orderId").slice(0, 5).toUpperCase()}</>
            )
        }
    },
    {
        accessorKey: "userId",
        header: "Customer Name",
        cell: ({ row }) => {
            const username = useGetUserById(row.getValue("userId")).data?.data?.username;
            return (
                <>
                    {username}
                </>
            )
        }
    },
    {
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => {
            const status = (row.getValue("orderStatus"))
            return (
                <>
                    < Select >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select >
                </>

            )
        }
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
        accessorKey: "shippingAddress",
        header: "Shipping Address",
    },
]
