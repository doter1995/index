import React from "react";
import {HashRouter, Route} from 'react-router-dom'
import {MenuWithRoute} from "./index";
import Menus from "./components/menus";

interface RoutersProps {
    routes: MenuWithRoute[]
}

export function Container(props: RoutersProps) {
    const {routes} = props;
    const getRouters = (routes: MenuWithRoute[]): MenuWithRoute[] => {
        const result: MenuWithRoute[] = [];
        const toPush = (routes: MenuWithRoute[]) => {
            routes.forEach(item => {
                if (item.component && item.path) {
                    result.push(item)
                }
                if (item.children) {
                    toPush(item.children)
                }
            })
        }
        toPush(routes);
        console.log("result", result);
        return result;
    }
    return <HashRouter>
        <div className="container">
            <Menus className="menu" menus={routes}/>
            <div className="content">
                <Route path='/'>
                    {getRouters(routes).map(item => {
                        return <Route key={item.path} path={item.path} component={item.component}/>
                    })}
                </Route>
            </div>
        </div>
    </HashRouter>
}