export interface BaseConfig {
    repos: string,
    token: string,
    configPath: string
}

export interface BlogConfig {
    user: {
        name: string,
        email: string
    },
    basePath: string;
}

export interface Config {
    baseConfig: BaseConfig
    blogConfig: BlogConfig
}
