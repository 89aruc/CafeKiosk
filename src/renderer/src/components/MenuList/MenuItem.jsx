import { Box, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";

export default function MenuItem() {
    return (
        <Card className="menuItem" sx={{boxShadow: 0}}>
            <CardHeader 
                sx={{textAlign: 'center'}}
                title="Title"
                subheader="가격" />
            <CardContent sx={{p: 0}}>
                <CardMedia
                    component="img"
                    height="194"
                    image="https://www.twosome.co.kr/resources/images/content/img_t_menu02@3x.png"
                    alt="Paella dish"
                />
            </CardContent>
            <CardActions sx={{p: 2}}>
                <Box className="MenuButtonWrap">
                    <button className="optionBtn">옵션</button>
                    <button className="putBtn">담기</button>
                </Box>
            </CardActions>
        </Card>
    )
}