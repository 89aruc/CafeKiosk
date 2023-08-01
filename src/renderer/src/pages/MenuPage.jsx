import '@styles/menu.scss'
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MenuList from '../components/MenuList';

export default function MenuPage() {
    const navigate = useNavigate()
    return(<div id="menu">
        <header>
            <Box className="titleImg">
                <IconButton className='backButton'
                    size="large"
                    onClick={() => navigate(-1)}>
                    <ArrowBackIosNewRoundedIcon fontSize="inherit" />
                </IconButton>
            </Box>
            <Box id="categoryList">
            </Box>
            <MenuList />
        </header> 
    </div>)
}