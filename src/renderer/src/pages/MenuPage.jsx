import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '@styles/menu.scss'

import CategoryList from "../components/CategoryList";
import MenuList from '../components/MenuList';
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function MenuPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selCategory, setSelCategory] = useState('커피');
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMenuList(selCategory);
    }, [])
    
    const getCategory = () => {
        axios.get('http://localhost:3000/category')
        .then((res) => {
            setCategories(res.data);
        })
        .catch((e) => console.error(e))
    }
    useEffect(() => {
        getCategory();
    }, [])

    const getMenuList = (category) => {
        axios.get('http://localhost:3000/menuList')
            .then((res) => {
                const data = res.data.filter(menu => menu.name === category);
                setMenus(data[0]);
                setLoading(false);
            })
            .catch((e) => console.error(e))
    }

    const selectCategory = (name) => {
        setLoading(true);
        setSelCategory(name);
        getMenuList(name);
    }

    return(<div id="menu">
        <header>
            <Box className="titleImg">
                <IconButton className='backButton'
                    size="large"
                    onClick={() => navigate(-1)}>
                    <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                </IconButton>
            </Box>
            <CategoryList categories={categories} selCategory={selCategory} onClick={selectCategory} />
            <MenuList menus={menus} loading={loading} />
        </header> 
    </div>)
}