import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { MenuCtx } from "@context/menuContext";

export default function MenuDetail() {
    const menuContext = MenuCtx();
    const { handleOpen, menuOpen } = menuContext;

    return (
        <Box>
            <Drawer
                anchor={'bottom'}
                open={menuOpen}
                onClose={handleOpen}
            >
                메뉴 정보 들어옴
            </Drawer>
        </Box>
    );
}
