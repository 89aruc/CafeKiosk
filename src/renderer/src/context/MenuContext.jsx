import { createContext, useContext, useEffect, useRef, useState } from "react";
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
    
    const orderMenuRef = useRef({});

    const [selMenu, setSelMenu] = useState(null);
    const selectMenu = (menu) => {
        setSelMenu(menu);
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const handleOpen = (menu) => {
        if(!menuOpen) {
            selectMenu(menu);
            if (!orderMenuRef.current) orderMenuRef.current = {};
            orderMenuRef.current = {
                name: menu.name,
                price: menu.price,
                option: []
            }
        }
        else {
            selectMenu(null);
            orderMenuRef.current = {};
        }
        setMenuOpen(!menuOpen);
    }

    const [basketList, setBasketList] = useState([]);
    const handleBasketUpdate = (data) => {
        setBasketList((prev) => [
            ...prev, data
        ]);
    }
    const handleBasketDelete = (id) => {
        const newList = basketList.filter(item => item.id !== id);
        setBasketList(newList);
    }

    useEffect(() => {
        console.log(basketList);
    }, [basketList])

    const menuPrice = (num) => Number(num).toLocaleString('ko-KR');

    return (
        <MenuContext.Provider value={{
            getCategory, categories, 
            getMenuList, menus,
            selectCategory, selCategory, loading,
            selMenu, selectMenu,
            handleOpen, menuOpen,
            basketList, setBasketList,
            orderMenuRef, handleBasketUpdate, handleBasketDelete,
            menuPrice
        }}> 
            { children }
        </MenuContext.Provider>
    )
}
export const MenuCtx = () => useContext(MenuContext);