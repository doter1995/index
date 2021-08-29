import {observable, action, runInAction} from 'mobx'
import {Blog, createBlog, getBlogList, saveBlogList, updateBlog} from "../service/blog";

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

    getBlog(path: string): Blog | undefined {
        return this.list.find((b) => b.path === path)
    }

    @action
    async updateBlogs(blog: Blog) {
        const blog1 = await updateBlog(blog)
        runInAction(() => {
            const idx = this.list.findIndex((b) => b.path === blog1.path)
            this.list[idx] = blog1
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