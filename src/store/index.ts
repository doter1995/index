import React from "react";
import {MobXProviderContext} from "mobx-react";
import config from "./config";
import blogs from "./blogs";

const stores = {
    config,
    blogs
}

export function useStores<T>(store?: string): T {
    const stores = React.useContext(MobXProviderContext);
    if (store && Object.keys(stores).includes(store)) {
        return stores[store]!
    }
    return stores as T
}

export default stores