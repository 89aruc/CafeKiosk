import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/menu.scss'

import CategoryList from "@components/CategoryList";
import MenuList from '@components/MenuList';
import MenuDetail from "@components/MenuDetail";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { MenuCtx } from "@context/menuContext";

export default function MenuPage() {
    const navigate = useNavigate();
    const menuContext = MenuCtx();
    const { getCategory, getMenuList, selCategory, basketList } = menuContext;


    useEffect(() => {
        getMenuList(selCategory);
        getCategory();
    }, []);

    return(<Box id="menu">
        <Box className="menuContainer">
            <header>
                <Box className="titleImg">
                    <IconButton className='backButton'
                        size="large"
                        onClick={() => navigate(-1)}>
                        <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <MenuDetail />
                </Box>
            </header> 
            <CategoryList />
            <MenuList />
        </Box>
        { basketList.length > 0 && (
            <Box className="basketContainer">
                {basketList.map(item => (
                    <p key={item.id}>{item.name}</p>
                ))}
            </Box>
        )}
    </Box>)
}