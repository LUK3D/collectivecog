import DraggableArea from "@renderer/components/DraggableArea";

export default function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div className=" flex w-full h-full text-gray-800">
            <div className="flex flex-col w-[60px] bg-slate-100 border-r">
            </div>
            <main className="bg-white flex flex-col w-full">
                <DraggableArea className="w-full h-[40px] flex ">
                    <div className="no-drag flex items-center px-4">
                        <p className="text-sm opacity-45">Coog v0.0.1</p>
                    </div>
                </DraggableArea>
                {children}
            </main>
        </div>
    );
}
