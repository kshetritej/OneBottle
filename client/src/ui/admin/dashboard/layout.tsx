import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar"
import { AppSidebar } from "../../../components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full my-3">
        <SidebarTrigger />
        <main className="p-4 max-h-[90vh] w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
