import {BaseConfig, BlogConfig, Config} from "./types";
import {getFileJSON} from "../file"

export * from './types'
export const DefaultConfig: Config = {
    baseConfig: {
        token: "",
        repos: "",
        configPath: "/conifg.json"
    },
    blogConfig: {
        user: {
            name: "",
            email: ""
        },
        basePath: ""
    }
}

function GetConfig() {
    let config: Config;
    return async (): Promise<Config> => {
        if (config) return config;
        config = await initConfig()
        return config;
    }
}

export const getConfig = GetConfig()

async function initConfig(): Promise<Config> {
    let baseConfig = getBaseConfig();
    let blogConfig = await getBlogConfig(baseConfig.configPath);
    return {
        baseConfig,
        blogConfig
    }
}

async function getBlogConfig(configPath: string): Promise<BlogConfig> {
    return getFileJSON<BlogConfig>(configPath);
}

export function setBaseConfig(config: BaseConfig) {
    localStorage.setItem("ConfigRepos", config.repos);
    localStorage.setItem("ConfigToken", config.token);
    localStorage.setItem("ConfigPath", config.configPath);
}

export function getBaseConfig(): BaseConfig {
    let repos = localStorage.getItem("ConfigRepos");
    let token = localStorage.getItem("ConfigToken");
    if (!repos || !token) {
        throw Error("没有找到配置")
    }
    let configPath = localStorage.getItem("ConfigPath");
    if (!configPath) {
        configPath = "/config.json"
    }
    return {
        repos: repos,
        token: token,
        configPath
    }

}




