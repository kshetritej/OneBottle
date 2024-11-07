import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuTrigger } from "./ui/dropdown-menu";

export function ActionMenuDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="hover:text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
