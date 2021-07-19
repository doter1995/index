interface Ref {
    id: string;
    name: string;
}

export interface Repos {
    name: string;
    refs: Ref[]
}

export interface getBranchReq {
    owner: string;
    repo: string;
}