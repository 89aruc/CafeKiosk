import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function QuantityPicker({ handleQuantity }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        handleQuantity(quantity)
    }, [quantity]);

    return (
        <Box className="quantityPicker">
            <IconButton 
                size="large"
                disabled={quantity <= 1}
                onClick={() => setQuantity((quantity) => quantity - 1)}>
                    <RemoveIcon fontSize="large"
                        sx={{color: '#000'}} />
                </IconButton>
            <Typography fontSize="1.5rem" fontWeight={600}
                className='quantity'> {quantity} </Typography>
            <IconButton 
                size="large"
                onClick={() => setQuantity((quantity) => quantity + 1)}>
                    <AddIcon fontSize="large"
                        sx={{color: '#000'}} />
                </IconButton>
        </Box>
    )
}