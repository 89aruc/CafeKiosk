import { MenuCtx } from "@context/menuContext";
import MenuItem from "./MenuItem";
import MenuItemSkeleton from "./MenuItemSkeleton";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export default function MenuList() {
    const menuContext = MenuCtx();
    const { menus, loading, selCategory } = menuContext;
    const scrollRef = useRef();

    useEffect(() => {
        // 스크롤 위치 상단으로
        scrollToTop();
    }, [selCategory, scrollRef]);

    const scrollToTop = () => {
        scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    };

    return (
        <Box id="menuList" >
            <Box className="menuWrap" ref={scrollRef}>
                {!loading ? (
                    menus.items && menus.items.map(menu => (
                        <MenuItem key={menu.name} menu={menu} />
                    ))
                ) : Array(12).fill(
                    <MenuItemSkeleton />
                )}
            </Box>
        </Box>
    )
} 