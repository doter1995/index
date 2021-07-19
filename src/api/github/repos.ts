import octokit from "./common";

export const queryListRepos = (username?: string):Promise<any> => {
    return octokit.graphql(
        `query ($owner: String!) {
                  user(login: $owner) {
                    name
                    repositories(first: 100) {
                      nodes {
                        name
                        refs(refPrefix: "refs/heads/", first: 100) {
                          nodes {
                            name
                            id
                          }
                        }
                      }
                      totalCount
                    }
                  }
                }`,
        {owner:username||"doter1995"}
    )

}
export const queryReposTree = (owner:string,name:string)=>{
    return octokit.graphql(`{
  repository(name: $name, owner: $owner) {
    object(expression: "master:") {
      ... on Tree {
        entries {
          name
          type
          object {
            ... on Blob {
              id
              text
            }
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    }
  }
}
`,
        {owner,name})
}

const queryTreeByIds = (ids:string[])=>{
    return octokit.graphql(`{
        nodes(ids: $ids) {
        ... on Tree {
                id
                entries {
                    name
                    type
                        object {
                    ... on Tree {
                            id
                        }
                    }
                }
            }
        }
    }`,
        {ids})
}

const treeNodeID = "MDQ6VHJlZTk5MTkzMTg1OjA3OTJkOTRjM2YzYjkxMzk2YTg3OGRkOTk5NDRlZDFmZjU1ZjU2ZGE="