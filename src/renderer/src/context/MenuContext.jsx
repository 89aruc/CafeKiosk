import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const MenuContext = createContext({});

export function MenuContextProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const getCategory = () => {
        axios.get('http://localhost:3000/category')
        .then((res) => {
            setCategories(res.data);
        })
        .catch((e) => console.error(e))
    }

    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);
    const getMenuList = (category) => {
        axios.get('http://localhost:3000/menuList')
            .then((res) => {
                const data = res.data.filter(menu => menu.name === category);
                setMenus(data[0]);
                setLoading(false);
            })
            .catch((e) => console.error(e))
    }

    const [selCategory, setSelCategory] = useState('커피');
    const selectCategory = (name) => {
        setLoading(true);
        setSelCategory(name);
        getMenuList(name);
    }

    const [selMenu, setSelMenu] = useState(null);
    const selectMenu = (menu) => {
        setSelMenu(menu);
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const handleOpen = (menu) => {
        if(!menuOpen) selectMenu(menu);
        else selectMenu(null);
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        console.log(selMenu);
    }, [selMenu])

    return (
        <MenuContext.Provider value={{
            getCategory, categories, 
            getMenuList, menus,
            selectCategory, selCategory, loading,
            selMenu, selectMenu,
            handleOpen, menuOpen
        }}> 
            { children }
        </MenuContext.Provider>
    )
}
export const MenuCtx = () => useContext(MenuContext);