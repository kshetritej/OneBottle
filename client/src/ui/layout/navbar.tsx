import { Link } from "@tanstack/react-router"
import { navigations } from "../../utils/navigations"
import { Input } from "../../components/ui/input"
import { ModeToggle } from "../../components/mode-toggle"
import { Beer, SearchIcon } from "lucide-react"
import { useState } from "react"

export const Navbar = () => {
    const [searchKey, setSearchKey] = useState("");
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            performSearch(searchKey);
        }
    }

    const performSearch = (query: string) => {
        console.log("searching for ...", query)
        setSearchKey("");
    }
    return (
        <>
            <div className="fixed top-0 p-2 z-40 w-full border-b-2 bg-primary-foreground  flex gap-2">
                <div className="p-2 bg-blue-600 dark:bg-secondary rounded-lg">
                    <Beer className="text-white" />
                </div>
                <div className="flex items-center gap-2 w-full"><Input placeholder="Search..." className="" onChange={(e) => setSearchKey(e.target.value)} onKeyDown={handleKeyDown} value={searchKey} /> <div className="bg-orange-500 rounded-lg p-2 text-white"><SearchIcon className="h-5 w-5" /></div></div>
            </div>
            <div className="fixed bottom-0 px-4  bg-primary-foreground border-t-2 z-40   flex justify-between items-center gap-4 w-[100%]">
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
