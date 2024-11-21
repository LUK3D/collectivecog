import { ChatInput } from "@renderer/components/chat-input/chat-input";
import Layout from "./layout";
import { useState } from "react";

export default function Workspace() {
    const [val, setVal] = useState("");

    return (
        <Layout>
            <div className="flex flex-col w-full h-full">
                <div className="w-full flex flex-col h-full">
                    <div className="empty w-full h-full flex flex-col justify-center items-center">
                        <h1 className="text-5xl font-black">
                            Hi there👋 <br /> Welcome to COOG
                        </h1>
                        <p className="max-w-[600px] opacity-65 mt-4">
                            Coog is a multi-platform opensource AI workspace
                            that can be extended to interact with any kind of
                            interface by creating custom extentions.
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col  pb-8 justify-center items-center">
                    <ChatInput
                        value={val}
                        onChange={(v) => {
                            setVal(v.target.value);
                        }}
                        data={[
                            {
                                id: "import",
                                display: "import",
                            },
                            {
                                id: "execute",
                                display: "execute",
                            },
                        ]}
                    >
                    </ChatInput>
                </div>
            </div>
        </Layout>
    );
}
