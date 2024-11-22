import {
    OnAddHandlerFunc,
    OnChangeHandlerFunc,
    SuggestionDataItem,
} from "react-mentions";

// import { provideExampleValue } from "react-mentions";

import { Mention, MentionsInput } from "react-mentions";
import { defaultInputStyle, defaultMentionStyle } from "./styles";
import { Button } from "../ui/button";
import { Image, Play, Plus } from "lucide-react";

import classNames from "./styles.module.css";

export function ChatInput(
    { value, data, onChange, onAdd }: {
        value: string | undefined;
        data: SuggestionDataItem[];
        onChange?: OnChangeHandlerFunc;
        onAdd?: OnAddHandlerFunc;
    },
) {
    return (
        <div className="scrollable flex flex-col w-2/4">
            <div className="w-full flex flex-col border-2 px-4 pt-2 rounded-[10px] bg-slate-50 shadow-lg text-lg">
                <MentionsInput
                    className="w-full"
                    classNames={classNames}
                    value={value}
                    onChange={onChange}
                    style={defaultInputStyle}
                    placeholder={"Execute commands using '@'"}
                    a11ySuggestionsListLabel={"Suggested commands"}
                >
                    <Mention
                        markup="@[__display__](user:__id__)"
                        displayTransform={(url) => `@${url}`}
                        trigger="@"
                        data={data}
                        renderSuggestion={(_, __, highlightedDisplay) => (
                            <div className="user text-red-500">
                                {highlightedDisplay}
                            </div>
                        )}
                        className={classNames.mentions__mention}
                        onAdd={onAdd}
                    />
                </MentionsInput>
                <div className="w-full py-2 flex justify-between items-center">
                    <div className="flex items-center text-slate-500 gap-2">
                        <Button
                            className="px-2 py-2 h-auto rounded-lg"
                            size={"sm"}
                            variant={"ghost"}
                        >
                            <Plus />
                            Add attachment
                        </Button>
                        <Button
                            className="px-2 py-2 h-auto rounded-lg"
                            size={"sm"}
                            variant={"ghost"}
                        >
                            <Image />
                            Use Image
                        </Button>
                    </div>
                    <Button className="px-2 py-2 h-auto rounded-lg" size={"sm"}>
                        <Play />
                    </Button>
                </div>
            </div>
        </div>
    );
}
