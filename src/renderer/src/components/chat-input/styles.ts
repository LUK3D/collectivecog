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
            outline: 'none',
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            background: "transparent",
        },
        input: {
            background: "transparent",
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
    fontWeight: "bold",
}