import { Box, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";

export default function MenuItem({ menu }) {

    return (
        <Card className="menuItem" sx={{boxShadow: 0}}>
            <CardHeader 
                sx={{textAlign: 'center'}}
                title={menu.name}
                subheader={menu.price} />
            <CardContent sx={{p: 0}}>
                <CardMedia
                    component="img"
                    height="210"
                    image={menu.original_image}
                    alt={menu.name}
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