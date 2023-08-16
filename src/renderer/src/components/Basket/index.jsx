import { MenuCtx } from "@context/menuContext";
import BasketItem from "./BasketItem";
import emblem from '@images/emblem.svg'
import { Box, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Basket() {
    const menuContext = MenuCtx();
    const { basketList, orderInfo, menuPrice, handleBasketReset } = menuContext;   
    const navigate = useNavigate(); 
    const handleMoveMain = () => {
        navigate(-1);
        handleBasketReset();
    }

    const scrollRef = useRef();
    useEffect(() => {
        // 스크롤 위치 하단으로
        scrollToBottom();
    }, [basketList, scrollRef]);
    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    };

    return (
        <Box className={"basketContainer " + (basketList.length > 0 ? 'active' : '')}>
            <img src={emblem} alt="A TWOSOME PLACE" className='emblem' />
            <Box className="titleWrap">
                <Typography variant="h3" 
                    fontSize="2.5rem" fontWeight={600}>나의 주문</Typography>
                <Typography fontSize="2rem">포장</Typography>
            </Box>
            <Box className="basketList">
                <Box ref={scrollRef}>
                    {basketList.length > 0 && basketList.map(item => (
                        <BasketItem key={item.name} item={ item } />
                    ))}
                </Box>
            </Box>
            <Box className="footer">
                <ul className="orderInfo">
                    <li>
                        <Typography>총 수량</Typography>
                        <Typography>{orderInfo ? orderInfo.totalQuantity : 0}개</Typography>
                    </li>
                    <li>
                        <Typography>전체 가격</Typography>
                        <Typography>{orderInfo ? menuPrice(orderInfo.totalPrice) : 0}원</Typography>
                    </li>
                </ul>
                <ul className="buttonWrap">
                    <li>
                        <button onClick={handleBasketReset}
                            className="resetBtn">
                            <DeleteOutlineIcon sx={{fontSize: '3rem', marginInline: 'auto'}} />
                        </button>
                        <button className="orderBtn">결제하기</button>
                    </li>
                    <li>
                        <button onClick={handleMoveMain}
                            className="mainMoveBtn">처음으로</button>
                    </li>
                </ul>
                {/* <img src="https://www.twosome.co.kr/resources/images/content/img_brochure_1.jpg"
                    className="marketingBanner"
                    alt="img_brochure" /> */}
            </Box>
        </Box>
    )
}