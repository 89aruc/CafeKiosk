import '@styles/main.scss'
import { useNavigate } from 'react-router-dom';
import MovingArea from '@components/MovingArea';
import mainBi from '@images/mainBi.svg'
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <div id="home">
            <header>
                <img src={mainBi} alt="A TWOSOME PLACE" className='mainBi' />
            </header>
            <main>
                <Box sx={{paddingLeft: '4rem'}}>
                    <Typography variant='h3' fontWeight={700}
                        className="mainTitle">
                        안녕하세요 <br />
                        무엇이든 말씀해주세요
                    </Typography>
                </Box>
                <Box>
                    <MovingArea position={"left"} startOffset={-540} />
                    <MovingArea position={"right"} startOffset={40} />
                    <MovingArea position={"left"} startOffset={0} />
                </Box>
                <Box className="recommend" bgcolor={grey[100]}>
                    <Typography variant='h4' fontWeight={600}
                        className='recommendTxt'>이런 메뉴는 어떠신가요</Typography>
                </Box>
            </main>
            <footer>
                <button className="startBtn"
                onClick={() => navigate('/menu')}>
                    <TouchAppIcon sx={{fontSize: '36px'}} /> 저는 둘러볼게요
                </button>
            </footer>
        </div>
    )
}