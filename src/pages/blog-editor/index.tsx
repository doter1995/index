import {observer} from "mobx-react";
import {Descendant} from "slate";
import blogs, {BlogsStore} from "../../store/blogs";
import {useStores} from "../../store";
import {useState} from "react";
import SlateEditor from "../components/slate-editor";
import styles from "./index.module.scss";

const BlogEditor = (observer(() => {
    const blogsStore = useStores<BlogsStore>('blogs')
    const [value, setValue] = useState<Descendant[]>([{
        type: 'paragraph',
        children: [
            {text: 'This is editable plain text, just like a <textarea>!'},
        ],
    }]);
    const handleChange = (value:Descendant[])=>{
        console.log(value)
        setValue(value)
    }
    return <div className={styles.Container}>
        <SlateEditor value={value} onChange={handleChange}/>
    </div>
}))
export default BlogEditor