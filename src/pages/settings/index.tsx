import {Tabs} from 'antd';
import {BaseSettings} from "./base";
import {BlogSettings} from "./blog";
import styles from "./index.module.scss"

const {TabPane} = Tabs;
export default function Settings() {

    return <div className={styles.Settings}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="基础设置" key="1">
                <BaseSettings />
            </TabPane>
            <TabPane tab="博客设置" key="2">
                <BlogSettings />
            </TabPane>
            <TabPane tab="其他" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    </div>
}