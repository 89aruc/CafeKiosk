import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/menu.scss'
import '@styles/basket.scss'

import { MenuCtx } from "@context/menuContext";
import CategoryList from "@components/CategoryList";
import MenuList from '@components/MenuList';
import MenuDetail from "@components/MenuDetail";
import Basket from "@components/Basket";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export default function MenuPage() {
    const navigate = useNavigate();
    const menuContext = MenuCtx();
    const { getCategory, getMenuList, selCategory } = menuContext;

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
                </Box>
            </header> 
            <CategoryList />
            <MenuList />
            <MenuDetail />
        </Box>
        <Basket />
    </Box>)
}