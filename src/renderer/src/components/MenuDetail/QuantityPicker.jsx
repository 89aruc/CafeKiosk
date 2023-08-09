import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function QuantityPicker({ quantity, handleQuantity }) {

    return (
        <Box className="quantityPicker">
            <IconButton 
                size="large"
                disabled={quantity <= 1}
                onClick={() => handleQuantity('minus')}>
                    <RemoveIcon fontSize="large"
                        sx={{color: '#000'}} />
                </IconButton>
            <Typography fontSize="1.5rem" fontWeight={600}
                className='quantity'> {quantity} </Typography>
            <IconButton 
                size="large"
                onClick={() => handleQuantity('plus')}>
                    <AddIcon fontSize="large"
                        sx={{color: '#000'}} />
                </IconButton>
        </Box>
    )
}