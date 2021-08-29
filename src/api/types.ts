export interface FileReq {
    name: string;
    path: string;
    content: string;
}
export interface File {
    id: string;
    name: string;
    content: string,
    path: string;
    size: number;
    createdDate?: number;
    updatedDate?: number;
}