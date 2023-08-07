import { useCallback, useEffect, useState } from 'react';
import { MenuCtx } from "@context/menuContext";
import RequiredOptions from './RequiredOptions';
import AdditionalOptions from './AdditionalOptions';

import { Box, Drawer, Paper, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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
    const [addOptionOpen, setAddOptionOpen] = useState(false);
    const handleAddOption = () => {
        setAddOptionOpen(!addOptionOpen);
        // 옵션 추가하고 확인 누르면 handleUpdate도 되도록 추가하기
    }
    
    const handleUpdate = () => {
        orderMenuRef.current.id = Date.now();
        orderMenuRef.current.original_image = selMenu.original_image
        handleBasketUpdate(orderMenuRef.current);
        handleOpen();
    }
    
    const [requiredOptions, setRequiredOptions]= useState([]);
    const [additionalOptions, setAdditionalOptions] = useState([]);

    useEffect(() => {
        if(selMenu) {
            setRequiredOptions(selMenu.subchoices.filter((option) => option.mandatory));
            setAdditionalOptions(selMenu.subchoices.filter((option) => !option.mandatory));
        }
    }, [selMenu])

    const Menu = useCallback(() => {
        const { is_available_order, name, original_image, subchoices } = selMenu;
    
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
                        <RequiredOptions key={option.name} option={option} />
                    ))}
                    {requiredOptions.length > 0 && requiredOptions.map(option => (
                        <RequiredOptions key={option.name} option={option} />
                    ))}
                    {additionalOptions.length > 0 && 
                        subchoices.some(option => !option.mandatory) ?
                        <button className="addOptionBtn" onClick={handleAddOption}>
                            <span style={{marginInline: 'auto'}}>음료제조 옵션</span>
                            <PlayArrowIcon fontSize="large" />
                        </button> : '' }
                </Box>
            </Box>
        )
    }, [additionalOptions, requiredOptions, selMenu])

    return (
        <Drawer
        anchor={'bottom'}
        open={menuOpen}
        id="menuDetail"
        elevation={10}
        transitionDuration={400}
        >
            {(selMenu !== null && !addOptionOpen) ? 
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
                </> : 
                <AdditionalOptions addOption={handleAddOption} options={additionalOptions} />
            }
        </Drawer>
    );
}
