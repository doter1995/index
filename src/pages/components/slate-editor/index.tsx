import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {createEditor, Descendant} from "slate";
import {Slate, withReact, Editable} from "slate-react";
import styles from "./index.module.scss";
import {Switch} from "antd";

interface SlateEditorProps {
    value: Descendant[],
    onChange: (value: Descendant[]) => void;
    onSave: (value: Descendant[]) => void;
}

const SlateEditor = (props: SlateEditorProps) => {
    const {value, onChange, onSave} = props;
    const [needSave, setNeedSave] = useState<boolean>(true);
    const [autoSave, setAutoSave] = useState<boolean>(true);
    useInterval(() => {
        if (autoSave && needSave) {
            onSave(value);
            setNeedSave(false);
        }
    }, 5000)
    const handlerChange = (value: any) => {
        setNeedSave(true);
        onChange(value)
    }
    const renderElement = useCallback(({attributes, children}) => <p {...attributes}>{children}</p>, [])
    const editor = useMemo(() => withReact(createEditor()), [])
    return <div className={styles.Container}>
        <div className="info">
            <p>上次更新时间</p>
            <p>自动保存
                <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={autoSave}
                        onChange={setAutoSave}/></p>
        </div>
        <Slate editor={editor} value={value} onChange={handlerChange}>
            <Editable/>
        </Slate>
    </div>
}
export default SlateEditor;
const useInterval = (callback: () => void, delay: number) => {
    const saveCallback = useRef(callback);
    useEffect(() => {
        saveCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if (delay !== null) {
            const timer: NodeJS.Timeout = setInterval(() => saveCallback.current(), delay);
            return () => {
                if (timer) {
                    clearInterval(timer); // 取消定时器；
                }
            }
        }
        return () => {
        }
    }, [delay]);
};