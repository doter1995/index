import {observable, action, runInAction} from 'mobx'
import {Blog, createBlog, getBlogList, saveBlogList} from "../service/blog";

export class BlogsStore {
    @observable list: Blog[] = [];


    @action
    async saveList() {
        await saveBlogList(this.list)
    }

    @action
    async addBlogs() {
        const blog = await createBlog()
        runInAction(() => {
            this.list.push(blog);
        })
        await this.saveList()
    }

    @action
    async getList() {
        const res = await getBlogList()
        runInAction(() => {
            console.log("res", res)
            this.list = res
        })
    }
}

const blogsStore = new BlogsStore
export default blogsStore;