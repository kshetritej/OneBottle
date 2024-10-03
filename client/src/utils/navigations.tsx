import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Cart } from "../ui/user/cart";

export const navigations = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
    },
    {
        label: "search", path: "/search",
        icon: <Search />,
    },
    {
        label: "cart",
        icon: <Cart />,
        // icon: <ShoppingCart />,
    },
    {
        label: "profile", path: "/admin/auth",
        icon: <User />,
    },
]