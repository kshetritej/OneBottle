import { AlignLeft, Heart, Menu, Milk, ShoppingCart, Tally1, User2 } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"
import { Input } from "../../components/ui/input"

export const Navbar = () => {
    return (
        <div className="px-4  py-2 flex justify-between items-center gap-4 border-b-2-secondary shadow-sm">
            < Sheet >
                <SheetTrigger>
                    <AlignLeft />
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader className="flex flex-col items-start text-left">
                        <SheetTitle>
                            <h1 className="flex items-center">
                                <span className="-mr-2">
                                    <Tally1 />
                                </span>
                                One Bottle</h1>
                        </SheetTitle>
                        <SheetDescription>
                            <h1>hol</h1>
                            <h1>hol</h1>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet >
            <Input placeholder="Search" className=" " />
        </div >
    )
}
