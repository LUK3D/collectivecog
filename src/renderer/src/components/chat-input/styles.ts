import { MentionsInputStyle } from "react-mentions";

export const defaultInputStyle: MentionsInputStyle = {
    control: {
        background: "transparent",
        outline: 'none'
    },

    '&multiLine': {
        control: {
            background: "transparent",
            outline: 'none'
        },
        highlighter: {
            background: "transparent",
            outline: 'none'
        },
        input: {
            background: "transparent",
            outline: 'none'
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            background: "transparent",
            border: '2px inset transparent',
        },
        input: {
            background: "transparent",
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
};

export const defaultMentionStyle = {
    backgroundColor: '#cee4e5',
}