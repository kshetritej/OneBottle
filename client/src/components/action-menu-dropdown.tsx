import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Query } from "../queries";
import { CreateCategoryModal } from "../ui/components/categories/create-category";
import { Category as CategoryType } from "../ui/components/categories/category-list";
import { Button } from "./ui/button";
export function ActionMenuDropdown({ item }: { item: CategoryType }) {
    const removeCatgegory = new Query().removeCategory;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}> <CreateCategoryModal category={item} mode={'update'} /></DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    removeCatgegory.mutate({ id: item.categoryId });
                }} className="hover:text-red-500">
                    <Button variant="ghost" size={'sm'}>Delete</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
