import {Menu} from "antd";
import {MenuWithRoute} from "../../index";
import {useHistory} from "react-router-dom";

const {SubMenu} = Menu

interface MenuProps {
    className?: string | undefined;
    menus: MenuWithRoute[],
}


export default function Menus(props: MenuProps) {
    let history = useHistory();
    const handleClick = (item: any) => {
        if (item.key.indexOf("/") === 0) {
            history.push(item.key)
        }
    }
    const menus = props.menus
    return <div className={props.className}>
        <Menu
            onClick={handleClick}
            style={{width: 256}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            {menus.map(MenusWithChildren)}
        </Menu>
    </div>
}

function MenusWithChildren(menu: MenuWithRoute) {
    if (!menu.component) {
        return <SubMenu key={`sub-${menu.title}`} icon={menu.icon} title={menu.title}>
            {
                menu.children && menu.children.map(MenusWithChildren)
            }
        </SubMenu>
    }
    return <Menu.Item key={menu.path} icon={menu.icon}>{menu.title}</Menu.Item>
}
