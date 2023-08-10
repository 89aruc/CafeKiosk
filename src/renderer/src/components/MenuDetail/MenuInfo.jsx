import { useEffect, useMemo, useState } from "react";
import { MenuCtx } from "@context/menuContext";
import { SelectMenuCtx, cupType } from ".";
import QuantityPicker from "@components/QuantityPicker";
import { Box, Typography } from '@mui/material';
import RequiredOptions from "./RequiredOptions";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function MenuInfo() {
    const menuContext = MenuCtx();
    const { selMenu } = menuContext;
    const { name, original_image, subchoices } = selMenu;
    const selectMenuContext = SelectMenuCtx();
    const { totalPrice, handleAddOption, quantity, handleQuantity, selectAdditional, requiredOptions, additionalOptions} = selectMenuContext;

        return (
            <Box className='menuInfo'>
                {/* {is_available_order ? '주문가능': '품절'} */}
                <Box className="content">
                    <img className="menuImg"
                        src={ original_image } alt={ name } />
                    <Typography className="title"
                        fontWeight={500}>{ name }</Typography>
                    <Typography variant='h4'
                        fontWeight={500}>{ totalPrice }원</Typography>
                </Box>
                <QuantityPicker quantity={ quantity } handleQuantity={ handleQuantity } />
                <Box className="subChoices">
                    {cupType.map(option => (
                        <RequiredOptions key={option.name} option={option} />
                    ))}
                    { requiredOptions && requiredOptions.length > 0 && requiredOptions.map(option => (
                        <RequiredOptions key={option.name} option={option} />
                    ))}
                    {additionalOptions && additionalOptions.length > 0 && 
                        subchoices.some(option => !option.mandatory) ?
                        <button className="addOptionBtn" onClick={handleAddOption}>
                            <span style={{marginInline: 'auto'}}>
                                음료제조 옵션 
                                {selectAdditional.length > 0 && <>
                                    &#40;
                                    <small className="selectAddOption">
                                        {selectAdditional.map(item => item.name).join()}
                                    </small>
                                    &#41;
                                </>}
                                </span>
                            <PlayArrowIcon fontSize="large" />
                        </button> : '' }
                </Box>
            </Box>
        )
}