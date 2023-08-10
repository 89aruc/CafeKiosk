import { Box } from "@mui/material";

import { MenuCtx } from '@context/menuContext';
import { Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel } from '@mui/material';
import { useEffect, useState } from "react";

export default function AdditionalOptions({ option }) {
    const menuContext = MenuCtx();
    const { orderMenuRef } = menuContext;

    const [checkedValues, setCheckedValues] = useState([]);

    useEffect(() => {
        console.log(orderMenuRef.current)
        if(orderMenuRef.current.option) {
            const key = option.name;
            const value = orderMenuRef.current.option[key];
            if (Array.isArray(value)) {
                value.map(item => {
                    setCheckedValues((prev) => [...prev, item.name]);
                })
            }
        }
    }, [])

    const handleCheckboxChange = (event) => {
        const value = event.target.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedValues((prev) => [...prev, value]);
        } else {
            setCheckedValues((prev) => prev.filter((item) => item !== value));
        }
    };

    useEffect(() => {
        const newOption = option.subchoices
            .filter((item) => checkedValues.includes(item.name))
            .map((item) => ({ name: item.name, price: item.price }));
        
        if(checkedValues.length <= 0) { 
            if(orderMenuRef.current['option'] && Object.keys(orderMenuRef.current['option']).includes(option.name)) {
                delete orderMenuRef.current['option'][option.name]
            }
        } else {
            const newValue = { ...orderMenuRef.current['option'], [option.name]: newOption };
            orderMenuRef.current = { ...orderMenuRef.current, option: newValue };
        }
    }, [checkedValues]);



    return (<FormControl>
        <FormLabel id={option.name}
            className='optionGroupTitle'>
            {option.name}
        </FormLabel>
        <FormGroup
            className="optionGroup">
            {option.subchoices.map(item => (
                <FormControlLabel key={item.id}
                    value={item.name}
                    control={
                        <Checkbox
                            checked={checkedValues.includes(item.name)}
                            onChange={handleCheckboxChange}
                            name={item.name} />
                    }
                    disabled={item.soldout ? item.soldout : false}
                    label={item.name}
                    sx={{
                        flexBasis: (
                            option.subchoices.length % 3 === 0 ?
                                'calc((100% - 2.56rem * 2) / 3)' : 'calc((100% - 2.56rem) / 2)')
                    }} // 옵션에 따라 설정 줘야할 듯
                    className={'option ' + (checkedValues.includes(item.name) ? 'active' : '')}
                />
            ))}
        </FormGroup>

    </FormControl>)
}