import {v4 as uuid} from 'uuid';
import {createFile, getFileJSON, updateFile} from "../file";
import {FileReq, File} from "../../api/types";

export interface Blog {
    name: string,
    desc: string,
    path: string,
    sha: string,
    createDate: number,
    updateDate: number,
}

export const updateBlog = async (blog: Blog): Promise<Blog> => {
    return {
        ...blog,
        updateDate: Date.now(),
    }
}
export const createBlog = async (): Promise<Blog> => {
    const date = new Date()
    const name = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    const file: FileReq = {
        name: name,
        path: `/${uuid()}.json`,
        content: "[]"
    }
    const fileInfo = await createFile(file);
    return {
        name: name,
        desc: "",
        path: fileInfo.path,
        sha: fileInfo.id,
        createDate: fileInfo.createdDate!,
        updateDate: fileInfo.updatedDate!,
    }
}
export const getBlogList = async (): Promise<Blog[]> => {
    return getFileJSON<Blog[]>("list.json")
}

export const saveBlogList = async (blogs: Blog[]) => {
    const file: FileReq = {
        name: "list.json",
        path: "list.json",
        content: JSON.stringify(blogs)
    }
    return updateFile(file)
}