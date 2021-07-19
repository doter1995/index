import {queryListRepos} from "../../api/github/repos";
import {Repos} from "./types";
import {translateListReposFromGithub} from "./translate";

export const getListRepos = async ():Promise<Repos[]> =>{
    return  queryListRepos("doter1995").then(translateListReposFromGithub)
}