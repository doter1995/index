import {decode, encode} from 'js-base64';
import {File, FileReq} from "../types";
import {BasePath, getBaseInfo} from "./base";

const SHA_MAP = new Map<string, string>()

export async function getFile(filePath: string): Promise<File> {
    const {owner, repo, access_token, branch} = getBaseInfo();
    const url = `${BasePath}/repos/${owner}/${repo}/contents${filePath}?ref=${branch}&access_token=${access_token}`
    const res = await fetch(url)
    const data = await res.json()
    if (!data.sha) {
        throw Error("file not found!")
    }
    SHA_MAP.set(filePath, data.sha)
    return {
        name: data.name,
        path: data.path,
        id: data.sha,
        size: data.size,
        content: decode(data.content)
    }
}

export async function createFile(fileReq: FileReq): Promise<File> {
    const {owner, repo, access_token, branch} = getBaseInfo();
    const url = `${BasePath}/repos/${owner}/${repo}/contents${fileReq.path}`
    const form = new FormData()
    form.set("access_token", access_token)
    form.set("content", encode(fileReq.content))
    form.set("branch", branch)
    form.set("message", `add: ${fileReq.name}`)
    const res = await fetch(url, {
        method: "POST",
        body: form
    })
    if (res.status != 201) {
        console.error("创建失败！")
        throw new Error("创建失败！")
    }
    const {content} = await res.json()
    debugger;
    return {
        createdDate: Date.now(),
        updatedDate: Date.now(),
        name: fileReq.name,
        content: fileReq.content,
        id: content.sha,
        path: content.path,
        size: content.size
    };
}

export async function updateFile(fileReq: FileReq): Promise<boolean> {
    const {owner, repo, access_token, branch} = getBaseInfo();
    const url = `${BasePath}/repos/${owner}/${repo}/contents${fileReq.path}`;
    const sha = SHA_MAP.get(fileReq.path)
    if (!sha) {
        throw Error("sha not found!")
    }
    const form = new FormData()
    form.set("access_token", access_token)
    form.set("content", encode(fileReq.content))
    form.set("branch", branch)
    form.set("message", `update: ${fileReq.name}`)
    form.set("sha", sha)
    const res = await fetch(url, {
        method: "PUT",
        body: form
    })
    if (res.status != 200) {
        console.error("请求失败！")
        return false
    }
    const {content} = await res.json()
    console.log(content)
    return true;
}
