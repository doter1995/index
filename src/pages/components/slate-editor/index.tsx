import {useCallback, useMemo, useState} from "react";
import {createEditor, Descendant} from "slate";
import {Slate, withReact, Editable} from "slate-react";

interface SlateEditorProps {
    value: Descendant[],
    onChange: (value: Descendant[]) => void;
}

const SlateEditor = (props: SlateEditorProps) => {
    const {value, onChange} = props
    const renderElement = useCallback(({attributes, children}) => <p {...attributes}>{children}</p>, [])
    const editor = useMemo(() => withReact(createEditor()), [])
    return <Slate editor={editor} value={value} onChange={onChange}>
        <Editable/>
    </Slate>
}
export default SlateEditor;