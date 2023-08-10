import { MenuCtx } from "@context/menuContext";
import emblem from '@images/emblem.svg'
import { Box, Typography } from "@mui/material";
import BasketItem from "./BasketItem";
import { useEffect } from "react";

export default function Basket() {
    const menuContext = MenuCtx();
    const { basketList, orderInfo } = menuContext;    

    return (
        <Box className={"basketContainer " + (basketList.length > 0 ? 'active' : '')}>
            <img src={emblem} alt="A TWOSOME PLACE" className='emblem' />
            <Box className="titleWrap">
                <Typography variant="h3" 
                    fontSize="2.5rem" fontWeight={600}>나의 주문</Typography>
                <Typography fontSize="2rem">포장</Typography>
            </Box>
            <Box className="basketList">
                <Box>
                    {basketList.length > 0 && basketList.map(item => (
                        <BasketItem key={item.name} item={ item } />
                    ))}
                </Box>
            </Box>
            <Box className="footer">
                <ul>
                    <li>
                        <Typography>총 수량</Typography>
                        <Typography>{orderInfo ? orderInfo.totalQuantity : 0}</Typography>
                    </li>
                    <li>
                        <Typography>전체 가격</Typography>
                        <Typography>{orderInfo ? orderInfo.totalPrice : 0}</Typography>
                    </li>
                </ul>
                <img src="https://www.twosome.co.kr/resources/images/content/img_brochure_1.jpg"
                    className="marketingBanner"
                    alt="img_brochure" />
            </Box>
        </Box>
    )
}