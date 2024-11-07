import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Calendar,
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