import { Box } from "@mui/material";
import MenuItem from "./MenuItem";
import { useCallback } from "react";
import MenuItemSkeleton from "./MenuItemSkeleton";
import { MenuCtx } from "@context/menuContext";

export default function MenuList() {
    const menuContext = MenuCtx();
    const { menus, loading } = menuContext;

    return (
        <Box id="menuList">
            <Box className="menuContainer">
                {!loading ? (
                    menus.items && menus.items.map(menu => (
                        <MenuItem key={menu.id} menu={menu} />
                    ))
                ) : Array(12).fill(
                    <MenuItemSkeleton />
                )}
            </Box>
        </Box>
    )
} 