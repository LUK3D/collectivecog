import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@renderer/components/ui/sidebar";

export function AppSidebar() {
    return (
        <Sidebar className="rounded-l-[10px] overflow-hidden">
            <SidebarHeader className="rounded-l-[10px] overflow-hidden" />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
