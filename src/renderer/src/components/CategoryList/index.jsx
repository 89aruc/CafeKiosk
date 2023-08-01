import { useState } from "react";
import { Box } from "@mui/material";

export default function CategoryList({ categories, selCategory, onClick }) {

    return (
        <Box id="categoryList">
            <Box className="categoryContainer">
                {categories && categories.map(category => (
                    <button key={category.id}
                        onClick={() => onClick(category.name)}
                        className={(selCategory === category.name ? 'active' : '')}>
                            {category.name}
                    </button>
                ))}
            </Box>
        </Box>
    )
}