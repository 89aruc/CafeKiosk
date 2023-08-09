
import { Box, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { MenuCtx } from "@context/menuContext";
import QuantityPicker from "../MenuDetail/QuantityPicker";
import { SelectMenuCtx } from "../MenuDetail";
import { useEffect, useState } from "react";

export default function BasketItem({ item }) {
    const menuContext = MenuCtx();
    const { handleBasketDelete } = menuContext;
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
                        <span className="name">{item.name}</span>
                    </Box>
                    <Box className="options">
                        {Object.entries(item.option).map(([key, value]) => {
                            if (Array.isArray(value)) {
                                return <p>{value.map(item => item.name).join(', ')}</p>
                            } else {
                                return <p key={key}>{value}</p>;
                            }
                        })}
                    </Box>
                </Box>
            </Box>
            <Box>
                <QuantityPicker quantity={quantity} handleQuantity={handleQuantity} />
                <p>{item.totalPrice}</p>
            </Box>
        </Box>
    )
}