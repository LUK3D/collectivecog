import DraggableArea from "@renderer/components/DraggableArea";
import { Button } from "@renderer/components/ui/button";
import { cn } from "@renderer/lib/utils";
import { Sparkles, Workflow } from "lucide-react";
import { NavLink, Outlet } from "react-router";
export default function WorkspaceLayout() {
    return (
        <div className=" flex w-screen h-screen text-gray-800 rounded-lg overflow-hidden">
            <div className="flex flex-col max-w-[60px] min-w-[60px] bg-slate-100 border-r items-center py-4 px-2 gap-2">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        cn([
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                                : "",
                            "w-10 h-10 flex flex-col justify-center items-center rounded-md p-2",
                        ])}
                >
                    <Sparkles />
                </NavLink>
                <NavLink
                    to="/editor"
                    className={({ isActive }) =>
                        cn([
                            isActive
                                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                                : "",
                            "w-10 h-10 flex flex-col justify-center items-center rounded-md p-2",
                        ])}
                >
                    <Workflow />
                </NavLink>
            </div>
            <main className="bg-white flex flex-col w-full relative">
                <DraggableArea className="w-full h-[40px] flex ">
                    <div className="no-drag flex items-center px-4">
                        <p className="text-sm opacity-45">Coog v0.0.1</p>
                    </div>
                </DraggableArea>
                <Outlet />
            </main>
        </div>
    );
}
