import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { NavigationSidebar } from "./NavigationSidebar";
import { Input } from "./ui/input";
import ThemeToggle from "./ThemeToggle";

export default function Layout() {
    return (
        <div className="flex flex-col">
            <SidebarProvider>
                <NavigationSidebar />
                <div className="w-full p-2">
                    <div className="flex items-center justify-between h-12">
                        <SidebarTrigger />
                        <Input placeholder="Search city..." className="max-w-sm w-full" />
                        <ThemeToggle />
                    </div>
                    <main className='w-full'>
                        <Outlet />
                    </main>
                    </div>
            </SidebarProvider>
        </div>
    )
}