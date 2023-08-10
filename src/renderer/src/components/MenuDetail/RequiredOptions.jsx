import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MenuCtx } from '@context/menuContext';

export default function RequiredOptions({ option }) {
  const menuContext = MenuCtx();
  const { orderMenuRef } = menuContext;

  const [value, setValue] = useState(null);
  useEffect(() => {
    if(option) {
      const key = option.name;
      const check = Object.keys(orderMenuRef.current.option).includes(key)
      const value = orderMenuRef.current.option[key];
      if(check) {
        setValue(value);
      }else {
        setValue(option.subchoices[0].name)
      }
    }
  }, [])

  useEffect(() => {
    
    const newValue = { ...orderMenuRef.current['option'], [option.name]: value };
    orderMenuRef.current = { ...orderMenuRef.current, option: newValue };
  }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id={option.name}
        className='optionGroupTitle'>
        {option.name}

      </FormLabel>
      <RadioGroup
        aria-labelledby={option.name}
        name={option.name}
        value={value}
        onChange={handleChange}
        className="optionGroup"
      >
        {option.subchoices.map(item => (
          <FormControlLabel key={item.id}
            value={item.name} 
            control={<Radio />} 
            disabled={item.soldout ? item.soldout : false}
            label={item.name}
            sx={{ flexBasis: (
                option.subchoices.length % 3 === 0 ? 
                'calc((100% - 2.56rem * 2) / 3)' : 'calc((100% - 2.56rem) / 2)') }} // 옵션에 따라 설정 줘야할 듯
            className={'option ' + (value === item.name ? 'active' : '')}
            />
        ))}
        
      </RadioGroup>
    </FormControl>
  );
}