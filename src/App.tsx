import React, {useEffect} from 'react';
import {Provider} from "mobx-react";

import PagesContainer from "./pages"
import stores from "./store"

import "antd/dist/antd.css"

function App() {
    useEffect(() => {
        stores.config.getBlogConfig().then(() => {
            return stores.blogs.getList()
        });
    }, []);
    return (
        <Provider {...stores}>
            <PagesContainer/>
        </Provider>
    );
}

export default App;
