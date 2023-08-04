import { Box } from "@mui/material";

export default function AdditionalOptions({ addOption,  options}) {
    // console.log(options)
    return (
        <Box className="additionalOptions">
            <button onClick={ addOption }>확인</button>
            {options && options.map(option => (
                <p key={option.name}>{option.name}</p>
            ))}
        </Box>
    )
}