"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { cn } from "@workspace/ui/lib/utils";
import {
    CreditCardIcon,
    InboxIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    Mic,
    PaletteIcon
} from "lucide-react";
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
    SidebarRail,
} from "@workspace/ui/components/sidebar";

const customerSupportItems = [
    {
        title: "Cuộc trò chuyện",
        url: "/conversations",
        icon: InboxIcon,
    },
    {
        title: "Cơ sở kiến thức",
        url: "/files",
        icon: LibraryBigIcon,
    }
];

// Configuration - Set up your support system
const configurationItems = [
    {
        title: "Tùy chỉnh tiện ích",
        url: "/customization",
        icon: PaletteIcon,
    },
    {
        title: "Tích hợp",
        url: "/integrations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Trợ lý giọng nói",
        url: "/plugins/vapi",
        icon: Mic,
    },
];

const accountItems = [
    {
        title: "Kế hoạch & Thanh toán",
        url: "/billing",
        icon: CreditCardIcon,
    }
]

export const DashboardSidebar = () => {
    const pathName = usePathname();

    const isActive = (url: string) => {
        if (url === "/") {
            return pathName === "/";
        }
        return pathName?.startsWith(url);
    }

    return (
        <Sidebar className="group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <OrganizationSwitcher
                                hidePersonal
                                skipInvitationScreen
                                appearance={{
                                    elements: {
                                        rootBox: "w-full! h-8!",
                                        avatarBox: "size-4! rounded-sm!",
                                        organizationSwitcherTrigger: "w-full! justify-start! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                        organizationPreview: "group-data-[collapsible=icon]:justify-center! gap-2!",
                                        organizationPreviewTextContainer: "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                                        organizationSwitcherTriggerIcon: "group-data-[collapsible=icon]:hidden! ml-auto! text-sidebar-foreground!",
                                    }
                                }}
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* customer support */}
                <SidebarGroup>
                    <SidebarGroupLabel>Hỗ trợ khách hàng</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerSupportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        className={cn(
                                            isActive(item.url) && "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90"
                                        )}
                                        tooltip={item.title}
                                    >
                                        <Link
                                            href={item.url}
                                        >
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* configuration */}
                <SidebarGroup>
                    <SidebarGroupLabel>Cấu hình</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {configurationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        className={cn(
                                            isActive(item.url) && "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90"
                                        )}
                                        tooltip={item.title}
                                    >
                                        <Link
                                            href={item.url}
                                        >
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* account */}
                <SidebarGroup>
                    <SidebarGroupLabel>Tài khoản</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        className={cn(
                                            isActive(item.url) && "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90"
                                        )}                                        
                                        tooltip={item.title}
                                    >
                                        <Link
                                            href={item.url}
                                        >
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserButton
                            showName
                            appearance={{
                                elements: {
                                    rootBox: "w-full! h-8!",
                                    userButtonTrigger: "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                    userButtonBox: "w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!",
                                    userButtonOuterIndentifier: "pl-0! group-data-[collapsible=icon]:hidden!",
                                    avatarBox: "size-4!"
                                }
                            }}
                        />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}