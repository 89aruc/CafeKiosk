
import { useEffect, useState } from "react";
import { MenuCtx } from "@context/menuContext";
import QuantityPicker from "@components/QuantityPicker";
import { Box, IconButton, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export default function BasketItem({ item }) {
    const menuContext = MenuCtx();
    const { handleBasketDelete, handleBasketQuantity, menuPrice } = menuContext;
    const [quantity, setQuantity] = useState(1);
    const handleQuantity = (type) => {
        switch(type) {
            case 'minus':
                setQuantity((quantity) => quantity - 1)
                break;
            case 'plus':
                setQuantity((quantity) => quantity + 1)
                break;
        }
    }

    useEffect(() => {
        setQuantity(item.quantity)
    }, []);
    
    useEffect(() => {
        handleBasketQuantity(item.id, quantity);
    }, [quantity])
    return (
        <Box key={item.id} className="basketItem">
            <Box className="itemContent">
                <img src={item.original_image} alt={item.name} />
                <Box className="info">
                    <Box className="top">
                        <IconButton className="cancelBtn"
                            onClick={() => handleBasketDelete(item.id)}>
                            {/* 버튼 누르면 해당 아이템 BasketList에서 삭제 처리 */}
                            <CancelIcon />
                        </IconButton>
                        <Typography fontWeight={500}
                            fontSize='1.2rem' 
                            className="name">{item.name}</Typography>
                    </Box>
                    <Box className="options">
                        {Object.entries(item.option).map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return <p key={item.name}>{value.map(item => item.name).join(', ')}</p>
                            } else {
                                return <p key={key}>{value}</p>;
                            }
                        })}
                    </Box>
                </Box>
            </Box>
            <Box className="itemPrice">
                <QuantityPicker quantity={quantity} handleQuantity={handleQuantity} />
                <Typography fontWeight={500}
                    fontSize='1.3rem'
                    className="price">{menuPrice(item.totalPrice)}원</Typography>
            </Box>
        </Box>
    )
}