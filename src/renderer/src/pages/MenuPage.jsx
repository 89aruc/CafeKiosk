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
    const {getCategory, getMenuList,selCategory } = menuContext;


    useEffect(() => {
        getMenuList(selCategory);
        getCategory();
    }, []);

    return(<div id="menu">
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
    </div>)
}