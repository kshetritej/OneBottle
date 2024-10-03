import { AlignLeft, Heart, Home, Menu, Milk, Search, ShoppingCart, Tally1, User, User2 } from "lucide-react"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"
import { menuList } from "../../utils/menu-list"
import { Link } from "@tanstack/react-router"
import { navigations } from "../../utils/navigations"

export const Navbar = () => {
    return (
        <div className="fixed bottom-0 p-3 px-4 bg-primary-foreground border-t-2   flex justify-between items-center gap-4 w-[100%]">
            {
                navigations.map(nav =>
                    <Link key={nav.label} to={nav.path && nav?.path}>
                        <div className="grid justify-items-center">{nav.icon}
                            {/* <span className="text-xs text-secondary-foreground">{nav.label.charAt(0).toUpperCase() + nav.label.slice(1, 10)}</span> */} </div>
                    </Link>
                )
            }
            <div>
                < Sheet >
                    <SheetTrigger>
                        <div className="grid justify-items-center" ><Menu />
                            {/* <span className="text-xs text-secondary-foreground pt-1">Menu</span> */}
                        </div>
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
                            </SheetDescription>
                            <SheetClose className="grid justify-items-start">
                                {menuList.map(list =>
                                    <Link className="flex w-full items-center  p-4 hover:bg-primary-foreground rounded-md gap-2" key={list.label} to={list.path}>
                                        {list.icon}
                                        <span className="ml-2">{list.label}</span>
                                    </Link>)}
                            </SheetClose>
                        </SheetHeader>
                    </SheetContent>
                </Sheet >

            </div>
        </div >
    )
}
