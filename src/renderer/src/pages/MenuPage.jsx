import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/menu.scss'
import '@styles/basket.scss'

import { MenuCtx } from "@context/menuContext";
import CategoryList from "@components/CategoryList";
import MenuList from '@components/MenuList';
import MenuDetail from "@components/MenuDetail";
import Basket from "@components/Basket";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import VoiceRecorder from "../components/VoiceRecorder";
import CancelIcon from '@mui/icons-material/Cancel';

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

    const [isRecording, setIsRecording] = useState(false)
    const handleVoiceRecorder = () => {
        setIsRecording(!isRecording);
    }

    const recordingInfo = () => {
        return <Box position="absolute" zIndex={1600}
                bottom="15rem" left="50%"
                bgcolor="#fff" p={1} pl={3}
                borderRadius={5}
                sx={{transform: 'translateX(-50%)'}}>
                <Typography component="span" fontSize="2rem"
                    sx={{verticalAlign: 'middle'}}>레코딩 기능 추가 예정</Typography>
                <IconButton
                    onClick={handleVoiceRecorder}>
                    <CancelIcon fontSize="large" />
                </IconButton>
            </Box>
    }

    
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
            <VoiceRecorder onClick={handleVoiceRecorder} />
            {isRecording && recordingInfo() }
        </Box>
        <Basket />
    </Box>)
}