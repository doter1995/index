import {ReactEditor} from "slate-react";
import {BaseEditor} from "slate";

declare module 'slate' {
    type CustomElement = { type: 'paragraph'; children: CustomText[] }
    type CustomText = { text: string }

    interface CustomTypes {
        Editor: BaseEditor & ReactEditor,
        Element: CustomElement
    }
}