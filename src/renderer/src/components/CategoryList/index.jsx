import { useState } from "react";
import { MenuCtx } from "@context/menuContext";
import { Box, Tab, Tabs } from "@mui/material";

export default function CategoryList() {

    const menuContext = MenuCtx();
    const { categories, selCategory, selectCategory, basketList} = menuContext;
    
    const [value, setValue] = useState(selCategory);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <Box id="categoryList">
            {basketList <= 0 ?
                <Box className="categoryContainer">
                {categories && categories.map(category => (
                    <button key={category.name}
                        onClick={() => selectCategory(category.name)}
                        className={'category ' + (selCategory === category.name ? 'active' : '')}>
                            {category.name}
                    </button>
                ))}
            </Box> :
            <Tabs
                value={selCategory}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
            >
                {categories && categories.map(category => (
                    <Tab key={category.name}
                        label={category.name}
                        value={category.name}
                        onClick={() => selectCategory(category.name)}
                        className={'category ' + (selCategory === category.name ? 'active' : '')} />
                ))}
            </Tabs>
        }
            
        </Box>
    )
}