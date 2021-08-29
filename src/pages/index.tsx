import Menus from "./components/menus";
import App from "./index.module.scss"
import React from "react";
import Settings from "./settings";
import BlogList from "./blog-list";
import {Container} from "./container";
import {MailOutlined, SettingOutlined} from "@ant-design/icons";
import BlogEditor from "./blog-editor";

export interface MenuWithRoute {
    title: string,
    path?: string,
    icon?: any,
    component?: React.ComponentType<any>,
    children?: MenuWithRoute[]
}

const menusRouters: MenuWithRoute[] = [
    {
        title: "博客",
        icon: <MailOutlined/>,
        path: "/blog",
        children: [
            {
                title: "列表",
                icon: <MailOutlined/>,
                path: "/blog/list",
                component: BlogList
            }, {
                title: "编辑",
                icon: <MailOutlined/>,
                path: "/blog/editor/:filePath",
                component: BlogEditor
            }, {
                title: "导出",
                icon: <MailOutlined/>,
                path: "/blog/export",
                component: BlogList
            }
        ]

    },
    {
        title: "设置",
        icon: <SettingOutlined/>,
        path: "/settings",
        component: Settings,
    },

]
export default function Pages() {
    return <div className={App.Container}>
        <Container routes={menusRouters}/>
    </div>
}