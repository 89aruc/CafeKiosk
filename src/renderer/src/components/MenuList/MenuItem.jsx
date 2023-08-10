import { MenuCtx } from "@context/menuContext";
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia } from "@mui/material";
import { cupType } from "../../pages/MenuPage";

export default function MenuItem({ menu }) {
    const menuContext = MenuCtx();
    const { handleOpen, menuPrice, orderMenuRef, handleBasketUpdate } = menuContext;
    const handleUpdate = () => {
        const options = {};
        options[cupType[0].name] = cupType[0].subchoices[0].name;
        const requiredOptions = menu.subchoices.filter((option) => option.mandatory);
        if(requiredOptions.length > 0) {
            requiredOptions.map(option => {
                return options[option.name] = option.subchoices[0].name;
            })
        }
        orderMenuRef.current = {
            id: Date.now(),
            name: menu.name,
            price: menu.price,
            option: options,
            original_image: menu.original_image,
            quantity: 1,
            totalPrice: menu.price
        }
        handleBasketUpdate(orderMenuRef.current);
    }

    return (
        <Card className="menuItem" 
            sx={{boxShadow: 0}}>
            <CardHeader 
                sx={{textAlign: 'center'}}
                title={menu.name}
                subheader={`${menuPrice(menu.price)}원`} />
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
                    <button className="optionBtn"
                        onClick={() => handleOpen(menu)}>옵션</button>
                    <button className="putBtn"
                        onClick={() => handleUpdate()}
                    >담기</button>
                </Box>
            </CardActions>
        </Card>
    )
}