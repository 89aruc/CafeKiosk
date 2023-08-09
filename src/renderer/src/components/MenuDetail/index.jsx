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
    const [selectAdditional, setSelectAdditional] = useState(null);

    useEffect(() => {
        if(selMenu) {
            setNewPrice(selMenu.price)
            setRequiredOptions(selMenu.subchoices.filter((option) => option.mandatory));
            setAdditionalOptions(selMenu.subchoices.filter((option) => !option.mandatory));
        }
    }, [selMenu])

    const [quantity, setQuantity] = useState(1);
    const handleQuantity = (type) => {
        switch(type) {
            case 'minus':
                setQuantity((quantity) => quantity - 1)
                break;
            case 'plus':
                setQuantity((quantity) => quantity + 1)
                break;
        }
    }
    const totalPrice = useMemo(() => {
        return menuPrice(newPrice * quantity);
    }, [newPrice, quantity]);

    const [addOptionOpen, setAddOptionOpen] = useState(false);
    const handleAddOption = () => {
        setAddOptionOpen(!addOptionOpen);
    }

    const handleUpdate = () => {
        orderMenuRef.current.id = Date.now();
        orderMenuRef.current.original_image = selMenu.original_image;
        orderMenuRef.current.quantity = quantity;
        orderMenuRef.current.totalPrice = totalPrice;
        handleBasketUpdate(orderMenuRef.current);
        handleOpen();
    }
    

    useEffect(() => {
        if(selMenu) {
            let price = Number(selMenu.price);
            let selectOptions = [];
            if(orderMenuRef.current.option) {
                Object.values(orderMenuRef.current.option).filter((value) => {
                    if (Array.isArray(value)) {
                        console.log('value: ', value)
                        value.map(item => {
                            selectOptions.push(item);
                            price += Number(item.price)
                        })
                    }
                }
            );
            }
            setSelectAdditional(selectOptions);
            setNewPrice(price);
        }
    }, [orderMenuRef.current])

    return (
        <Drawer
        anchor={'bottom'}
        open={menuOpen}
        id="menuDetail"
        elevation={10}
        transitionDuration={400}
        >
            <SelectMenuContext.Provider value={{
                requiredOptions, additionalOptions, 
                newPrice, quantity, handleQuantity, totalPrice,
                handleAddOption, selectAdditional
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