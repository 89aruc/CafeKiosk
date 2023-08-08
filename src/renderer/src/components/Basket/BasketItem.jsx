
import { Box, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { MenuCtx } from "@context/menuContext";

export default function BasketItem({ item }) {
    const menuContext = MenuCtx();
    const { handleBasketDelete, menuPrice } = menuContext;

    return(
        <Box key={item.id} className="basketItem">
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
                {Object.entries(item.option).map(([key, value]) => (
                    <p key={key}>
                    {`${value}`}
                    </p>
                ))}
                </Box>
                <p>{menuPrice(item.price * item.quantity)}</p>
            </Box>
        </Box>
    )
}