import {observable, action, runInAction} from 'mobx'
import {BaseConfig, BlogConfig, Config, DefaultConfig, setBaseConfig, getBaseConfig} from "../service";
import {getFileJSON, updateFile} from "../service/file";
import {FileReq} from "../api/types";

export class ConfigStore implements Config {
    @observable baseConfig: BaseConfig = {...DefaultConfig.baseConfig};
    @observable blogConfig: BlogConfig = {...DefaultConfig.blogConfig};

    constructor() {
        this.baseConfig = getBaseConfig()
    }

    @action
    setBaseConfig(conf: BaseConfig) {
        setBaseConfig(conf)
        this.baseConfig = conf;
    }

    @action
    async getBlogConfig(path?: string) {
        const filePath = path || this.baseConfig.configPath
        const res = await getFileJSON<BlogConfig>(filePath)
        runInAction(() => {
            console.log("res", res)
            this.blogConfig = res
        })
    }

    @action
    async setBlogConfig(conf: BlogConfig) {
        const fileReq: FileReq = {
            name: 'config.json',
            path: this.baseConfig.configPath,
            content: JSON.stringify(conf)
        }
        const res = await updateFile(fileReq)
        runInAction(() => {
            this.blogConfig = conf;
        })

    }
}

const configStore = new ConfigStore
export default configStore;