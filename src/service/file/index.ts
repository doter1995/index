import {FileReq, File} from "../../api/types";
import {
    createFile as createFileByGitee,
    updateFile as updateFileByGitee,
    getFile as getFileByGitee
} from "../../api/gitee/repos";

export async function getFileJSON<T>(path: string): Promise<T> {
    const file = await getFile(path)
    return JSON.parse(file.content)
}

export async function getFile(path: string): Promise<File> {
    return await getFileByGitee(path)
}

export async function createFile(file: FileReq): Promise<File> {
    return await createFileByGitee(file);
}

export async function updateFile(file: FileReq): Promise<boolean> {
    return await updateFileByGitee(file);
}

export function deleteFile(file: File): boolean {
    return true;
}

