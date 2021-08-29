import stores from "../../store";

export const BasePath = "https://gitee.com/api/v5"
export const getBaseInfo = () => {
    const conf = stores.config.baseConfig
    return {
        access_token: conf.token,
        owner: "Doter1995",
        branch: "blog-doc",
        repo: conf.repos,
        path: conf.configPath
    }
}