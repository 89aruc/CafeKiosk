import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MenuCtx } from "@context/menuContext";
import AdditionalOptionContainer from './AdditionalOptionContainer';
import MenuInfo from './MenuInfo';

import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const cupType = [{
    "name": '포장 여부',
    "subchoices": [
        {id: 1, name: '머그컵'}, 
        {id: 2, name: '개인컵'}, 
        {id: 3, name: '일회용'}
    ]
}]
const SelectMenuContext = createContext();

export default function MenuDetail() {
    const menuContext = MenuCtx();
    const { handleOpen, menuOpen, selMenu, orderMenuRef, handleBasketUpdate, menuPrice } = menuContext;
    const [requiredOptions, setRequiredOptions]= useState([]);
    const [additionalOptions, setAdditionalOptions] = useState([]);
    const [newPrice, setNewPrice] = useState(0);

    useEffect(() => {
        if(selMenu) {
            setNewPrice(selMenu.price)
            setRequiredOptions(selMenu.subchoices.filter((option) => option.mandatory));
            setAdditionalOptions(selMenu.subchoices.filter((option) => !option.mandatory));
        }
    }, [selMenu])

    const [quantity, setQuantity] = useState(1);
    const handleQuantity = (num) => {
        setQuantity(num)
    }
    const totalPrice = useMemo(() => {
        return menuPrice(newPrice * quantity);
    }, [newPrice, quantity]);

    const [addOptionOpen, setAddOptionOpen] = useState(false);
    const [addOptions, setAddOptions] = useState(null);
    const handleAddOption = () => {
        setAddOptionOpen(!addOptionOpen);
        // 옵션 추가하고 확인 누르면 handleUpdate도 되도록 추가하기
    }

    const handleUpdate = () => {
        orderMenuRef.current.id = Date.now();
        orderMenuRef.current.original_image = selMenu.original_image;
        orderMenuRef.current.quantity = quantity;
        handleBasketUpdate(orderMenuRef.current);
        handleOpen();
    }

    return (
        <Drawer
        anchor={'bottom'}
        open={menuOpen}
        id="menuDetail"
        elevation={10}
        transitionDuration={400}
        > <SelectMenuContext.Provider value={{
            requiredOptions, additionalOptions, 
            newPrice, quantity, handleQuantity, totalPrice,
            handleAddOption
        }} >
            {(selMenu !== null && !addOptionOpen) ? 
                <>
                    <button 
                        onClick={handleOpen}
                        className="closeBtn">
                        <CloseIcon sx={{fontSize: '3.21rem'}} />
                    </button>
                    {<MenuInfo />}
                    <button className='orderBtn'
                        onClick={handleUpdate}>
                        장바구니 담기
                    </button>
                </> : 
                <AdditionalOptionContainer />
            }
            </SelectMenuContext.Provider>
        </Drawer>
    );
}

export const SelectMenuCtx = () => useContext(SelectMenuContext)