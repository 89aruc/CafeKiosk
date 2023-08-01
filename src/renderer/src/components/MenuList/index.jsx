import { Box } from "@mui/material";
import MenuItem from "./MenuItem";
import { useCallback } from "react";
import MenuItemSkeleton from "./MenuItemSkeleton";

export default function MenuList({ menus, loading }) {
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