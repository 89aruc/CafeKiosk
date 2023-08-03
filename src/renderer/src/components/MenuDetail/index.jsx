import { useCallback, useEffect, useState } from 'react';
import { MenuCtx } from "@context/menuContext";

import { Box, Drawer, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RequiredOption from './RequiredOption';

const cupType = [{
    "name": '포장 여부',
    "subchoices": [
        {id: 1, name: '머그컵'}, 
        {id: 2, name: '개인컵'}, 
        {id: 3, name: '일회용'}
    ]
}]

export default function MenuDetail() {
    const menuContext = MenuCtx();
    const { handleOpen, menuOpen, selMenu, orderMenuRef, handleBasketUpdate } = menuContext;

    const handleUpdate = () => {
        orderMenuRef.current.id = Date.now();
        handleBasketUpdate(orderMenuRef.current);
        handleOpen();
    }
    
    const Menu = useCallback(() => {
        const { is_available_order, name, original_image, subchoices
        } = selMenu;
    
        return (
            <Box className='menuInfo'>
                {/* {is_available_order ? '주문가능': '품절'} */}
                <Box className="content">
                    <h3 className="title">{ name }</h3>
                    <img className="menuImg"
                        src={ original_image } alt={ name } />
                </Box>
                <Box className="subChoices">
                    {cupType.map(option => (
                        <RequiredOption key={option.name} option={option} />
                    ))}
                    {subchoices && subchoices.map(option => {
                        if(option.mandatory) {
                            // 필수 옵션
                            return <RequiredOption key={option.name} option={option} />
                        }
                    })}
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
                <>
                    <button 
                        onClick={handleOpen}
                        className="closeBtn">
                        <CloseIcon sx={{fontSize: '3.21rem'}} />
                    </button>
                    {<Menu />}
                    <button className='orderBtn'
                        onClick={handleUpdate}>
                        장바구니 담기
                    </button>
                </>}
        </Drawer>
    );
}
