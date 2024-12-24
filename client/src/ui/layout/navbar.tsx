import { Link } from "@tanstack/react-router"
import { navigations, navigationsGroupSecond } from "../../utils/navigations"
import { Input } from "../../components/ui/input"
import { Beer, SearchIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "../../lib/utils"

export const Navbar = () => {
    const fullNavigations = [...navigations, ...navigationsGroupSecond]
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
            <div className="fixed top-0 md:p-1 z-40 w-full border-b-2 bg-primary-foreground flex  justify-between gap-2">
                <div className="flex items-center gap-4  p-2  rounded-lg">
                    <Link to="/" className="dark:bg-blue-600 rounded-full bg-secondary p-2">
                        <Beer className="text-white" />
                    </Link>
                    <div className="flex items-center gap-2 w-[342px]"><Input placeholder="Search..." className="rounded-full" onChange={(e) => setSearchKey(e.target.value)} onKeyDown={handleKeyDown} value={searchKey} /> 
                    {/* <div className="bg-orange-500 rounded-lg p-2 text-white"><SearchIcon className="h-5 w-5" /></div> */}
                    </div>
                </div>
                <div className="hidden md:flex gap-4 ">
                    {
                        navigations.map(nav =>
                            <Link key={nav.label} to={nav.path && nav?.path} >
                                <div className={cn(nav.isActive == false ? "bg-primary-foreground" : "bg-secondary", "flex items-center  hover:bg-secondary p-4 px-8   rounded-lg")}>{nav.icon}
                                    {/* <span className="text-xs text-secondary-foreground">{nav.label.charAt(0).toUpperCase() + nav.label.slice(1, 10)}</span> */}
                                </div>
                            </Link>
                        )
                    }
                </div>
                <div className="hidden md:flex items-center gap-4">
                    {
                        navigationsGroupSecond.map(nav =>
                            <Link key={nav.label} to={nav.path && nav?.path} >
                                <div className="flex items-center hover:bg-secondary px-8 p-4 rounded-lg">{nav.icon}
                                    {/* <span className="text-xs text-secondary-foreground">{nav.label.charAt(0).toUpperCase() + nav.label.slice(1, 10)}</span> */}
                                </div>
                            </Link>
                        )
                    }
                    
                </div>
            </div>
            <div className="fixed bottom-0 px-4  bg-primary-foreground border-t-2 z-40   flex justify-between items-center gap-4 w-[100%] md:hidden" >
                {
                    fullNavigations.map(nav =>
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
