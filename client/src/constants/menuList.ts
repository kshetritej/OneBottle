import {  Inbox , Search, Settings, WineIcon, Shapes,  FrameIcon } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: FrameIcon,
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: WineIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]