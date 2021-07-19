import {Repos} from "./types";

export const translateListReposFromGithub = (res:any):Repos[] => {
    return res.user.repositories.nodes.map((item:any)=>({
    ...item, refs:item.refs.nodes
    }))
}