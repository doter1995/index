import styles from "./index.module.scss";
import {observer} from "mobx-react";
import {useStores} from "../../store";
import blogs, {BlogsStore} from "../../store/blogs";
import {Button} from "antd";

const BlogList = (observer(() => {
    const blogsStore = useStores<BlogsStore>('blogs')
    const createBlog = () => {
        blogsStore.addBlogs()
    }
    const handlerEditor = ()=>{

    }
    return <div className={styles.Container}>
        <div className="filter">
            <Button onClick={createBlog}>新建</Button>
        </div>
        <div className="list">
            <p>{blogsStore.list.length}</p>
            {
                blogsStore.list.map(item => {
                    return <div className="item" key={item.sha} onClick={handlerEditor}>
                        <p>{item.name}</p>
                        <p>{item.path}</p>
                        <p>{item.sha}</p>
                        <p>{item.desc}</p>
                    </div>
                })
            }

        </div>

    </div>
}))
export default BlogList