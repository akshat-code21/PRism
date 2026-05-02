"use client"
import Link from "next/link"
import { History, LayoutDashboard, LucideIcon, Plus, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Separator } from "./ui/separator"

interface NavItem{
    title : string,
    href : string,
    icon : LucideIcon
}

const navItems:NavItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "New review",
        href: "/dashboard/new",
        icon: Plus,
    },
    {
        title: "History",
        href: "/dashboard/reviews",
        icon: History,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-16 justify-center px-3 py-0">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="size-9 items-center justify-center rounded-lg hidden group-data-[collapsible=icon]:flex">
                        <span className="text-xl font-bold">
                            <span className="text-primary">PR</span>
                        </span>
                    </div>
                    <div className="grid flex-1 text-left text-xl leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="text-xl font-bold">
                            <span className="text-xl text-primary">PR</span>ism
                        </span>
                        <span className="text-xs text-muted-foreground">AI review agent</span>
                    </div>
                </Link>
            </SidebarHeader>
            <Separator/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item:NavItem) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton tooltip={item.title} render={<Link href={item.href} />} className={`${path === item.href ? "bg-sidebar-accent" : ""} `}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t">
                <div className="rounded-lg bg-sidebar-accent p-3 text-xs text-sidebar-foreground/80 group-data-[collapsible=icon]:hidden">
                    Review pull requests, track generated feedback, and revisit past runs.
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}