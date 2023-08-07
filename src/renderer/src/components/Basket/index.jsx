import { MenuCtx } from "@context/menuContext";
import emblem from '@images/emblem.svg'
import { Box, Typography } from "@mui/material";
import BasketItem from "./BasketItem";

export default function Basket() {
    const menuContext = MenuCtx();
    const { basketList } = menuContext;

    return (
        <Box className={"basketContainer " + (basketList.length > 0 ? 'active' : '')}>
            <img src={emblem} alt="A TWOSOME PLACE" className='emblem' />
            <Box className="titleWrap">
                <Typography variant="h3" 
                    fontSize="2.5rem" fontWeight={600}>나의 주문</Typography>
                <Typography fontSize="2rem">포장</Typography>
            </Box>
            <Box className="basketList">
                {basketList.length > 0 && basketList.map(item => (
                    <BasketItem key={item.name} item={ item } />
                ))}
            </Box>
        </Box>
    )
}