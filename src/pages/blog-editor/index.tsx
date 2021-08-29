import {observer} from "mobx-react";
import {CustomText, Descendant} from "slate";
import blogs, {BlogsStore} from "../../store/blogs";
import {useStores} from "../../store";
import {useEffect, useState} from "react";
import SlateEditor from "../components/slate-editor";
import styles from "./index.module.scss";
import {Button} from "antd";
import {useParams} from "react-router-dom";
import {Blog} from "../../service/blog";
import {getFileJSON, updateFile} from "../../service/file";
import {FileReq} from "../../api/types";

const defaultData: Descendant[] = [{
    type: 'paragraph', children: [{text: ""}]
}]
const BlogEditor = (observer(() => {
    const blogsStore = useStores<BlogsStore>('blogs')
    const [blogInfo, setBlogInfo] = useState<Blog>()
    const params = useParams<Record<string, string>>()
    const [value, setValue] = useState<Descendant[]>(defaultData);
    useEffect(() => {
        const blogInfo = blogsStore.getBlog(params.filePath)
        setBlogInfo(blogInfo)
        if(blogInfo?.path){
            getContent(blogInfo?.path)
        }
        console.log("blog", blogInfo)
    }, [params.filePath, blogsStore])

    const getContent = async (path: string) => {
        const value = await getFileJSON<Descendant[]>(path)
        if(!value||value.length==0){
            setValue(defaultData)
            return;
        }
        setValue(value)
    }

    const handleSave = async () => {
        if (!blogInfo) {
            console.error("blogInfo 不存在")
            return;
        }
        const file: FileReq = {
            content: JSON.stringify(value),
            name: blogInfo?.name,
            path: blogInfo?.path
        }
        const fileRes = await updateFile(file)
        blogsStore.updateBlogs({
            ...blogInfo,
            updateDate: fileRes.updatedDate!
        })
        // blogsStore.updateBlog()
    }
    const handleChange = (value: Descendant[]) => {
        setValue(value)
    }
    return <div className={styles.Container}>
        <Button onClick={handleSave}>保存</Button>
        <SlateEditor value={value} onChange={handleChange} onSave={() => {
        }}/>
    </div>
}))
export default BlogEditor