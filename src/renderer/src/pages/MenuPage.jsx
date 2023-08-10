import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/menu.scss'
import '@styles/basket.scss'

import { MenuCtx } from "@context/menuContext";
import CategoryList from "@components/CategoryList";
import MenuList from '@components/MenuList';
import MenuDetail from "@components/MenuDetail";
import Basket from "@components/Basket";
import { Box, Button, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import { Bootpay } from '@bootpay/client-js'

export const cupType = [{
    "name": '포장 여부',
    "subchoices": [
        {id: 1, name: '머그컵'}, 
        {id: 2, name: '개인컵'}, 
        {id: 3, name: '일회용'}
    ]
}]

export default function MenuPage() {
    const navigate = useNavigate();
    const menuContext = MenuCtx();
    const { getCategory, getMenuList, selCategory } = menuContext;

    useEffect(() => {
        getMenuList(selCategory);
        getCategory();
    }, []);

    // const handleTestBootpay = async () => {
    //     const response = await Bootpay.requestPayment({
    //         "application_id": "59a4d323396fa607cbe75de4",
    //         "price": 1000,
    //         "order_name": "테스트결제",
    //         "order_id": "TEST_ORDER_ID",
    //         "pg": "다날",
    //         "method": "카드",
    //         "tax_free": 0,
    //         "user": {
    //           "id": "회원아이디",
    //           "username": "회원이름",
    //           "phone": "01000000000",
    //           "email": "test@test.com"
    //         },
    //         "items": [
    //           {
    //             "id": "item_id",
    //             "name": "테스트아이템",
    //             "qty": 1,
    //             "price": 1000
    //           }
    //         ],
    //         "extra": {
    //           "open_type": "iframe",
    //           "card_quota": "0,2,3",
    //           "escrow": false
    //         }
    //       })
    //       console.log(response);
    // }

    return(<Box id="menu">
        <Box className="menuContainer">
            <header>
                <Box className="titleImg">
                    <IconButton className='backButton'
                        size="large"
                        onClick={() => navigate(-1)}>
                        <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                    </IconButton>
                    {/* <Button variant="contained" size="large"
                    onClick={handleTestBootpay}>결제 테스트</Button> */}
                </Box>
            </header> 
            <CategoryList />
            <MenuList />
            <MenuDetail />
        </Box>
        <Basket />
    </Box>)
}