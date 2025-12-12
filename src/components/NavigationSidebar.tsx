import { Home, Bookmark, CircleQuestionMark, Github } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export function NavigationSidebar() {
    const { toggleSidebar } = useSidebar();
    const isMobile = useIsMobile();

    const { t } = useTranslation();

    const items = [
        {
            title: t("home"),
            url: "/",
            icon: Home,
        },
        {
            title: t("bookmarks"),
            url: "/bookmarks",
            icon: Bookmark,
        },
        {
            title: t("about"),
            url: "/about",
            icon: CircleQuestionMark,
        },
    ];

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("site")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            onClick={() => {
                                                if (isMobile) toggleSidebar();
                                            }}
                                        >
                                            <item.icon />
                                            {item.title}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{t("language")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <LanguageSelector />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-2 border-t">
                <a href="https://github.com/GinoMoses/react-weather">
                    <Github />
                </a>
            </SidebarFooter>
        </Sidebar>
    );
}
