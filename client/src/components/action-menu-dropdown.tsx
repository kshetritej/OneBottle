import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Query } from "../queries";

export function ActionMenuDropdown({ item }: { item: any }) {
    const removeCatgegory = new Query().removeCategory;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    removeCatgegory.mutate({ id: item.categoryId });
                }} className="hover:text-red-500">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
