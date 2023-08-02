import { MenuCtx } from "@context/menuContext";
import { Box } from "@mui/material";

export default function CategoryList() {

    const menuContext = MenuCtx();
    const { categories, selCategory, selectCategory} = menuContext;
    
    return (
        <Box id="categoryList">
            <Box className="categoryContainer">
                {categories && categories.map(category => (
                    <button key={category.name}
                        onClick={() => selectCategory(category.name)}
                        className={(selCategory === category.name ? 'active' : '')}>
                            {category.name}
                    </button>
                ))}
            </Box>
        </Box>
    )
}