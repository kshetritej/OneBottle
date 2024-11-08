import { Menu, Tally1 } from "lucide-react"
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
import { Input } from "../../components/ui/input"
import { ModeToggle } from "../../components/mode-toggle"

export const Navbar = () => {
    return (
        <>
            <div className="p-2 border-b-2 bg-primary-foreground z-40 flex gap-2">
                <Input placeholder="Search..." className="" /> <div><ModeToggle/></div>
            </div>
            <div className="fixed bottom-0 px-4  bg-primary-foreground border-t-2   flex justify-between items-center gap-4 w-[100%]">
                {
                    navigations.map(nav =>
                        <Link key={nav.label} to={nav.path && nav?.path}>
                            <div className="grid justify-items-center hover:bg-primary-foreground p-4 rounded-md">{nav.icon}
                                {/* <span className="text-xs text-secondary-foreground">{nav.label.charAt(0).toUpperCase() + nav.label.slice(1, 10)}</span> */}
                            </div>
                        </Link>
                    )
                }
            </div >
        </>
    )
}
