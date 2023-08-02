import { useCallback, useState } from 'react';
import { MenuCtx } from "@context/menuContext";

import { Box, Drawer, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function MenuDetail() {
    const menuContext = MenuCtx();
    const { handleOpen, menuOpen, selMenu } = menuContext;
    const [ menuInfo, setMenuInfo] = useState(null);
    
    const Menu = useCallback(() => {
        const { is_available_order, name, original_image
        } = selMenu;
        return (
            <Box className='menuInfo'>
                <button 
                    onClick={handleOpen}
                    className="closeBtn">
                    <CloseIcon sx={{fontSize: '3.21rem'}} />
                </button>
                {/* {is_available_order ? '주문가능': '품절'} */}
                <Box className="content">
                    <h3 className="title">{ name }</h3>
                    <img className="menuImg"
                        src={ original_image } alt={ name } />
                </Box>
            </Box>
        )
    }, [selMenu])

    return (
        <Drawer
        anchor={'bottom'}
        open={menuOpen}
        id="menuDetail"
        elevation={10}
        transitionDuration={400}
        >
            {selMenu !== null && 
                <Paper elevation={4}>
                    {<Menu />}
                </Paper>}
        </Drawer>
    );
}
