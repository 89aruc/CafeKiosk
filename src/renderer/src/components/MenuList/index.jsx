import { MenuCtx } from "@context/menuContext";
import MenuItem from "./MenuItem";
import MenuItemSkeleton from "./MenuItemSkeleton";
import { Box } from "@mui/material";

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