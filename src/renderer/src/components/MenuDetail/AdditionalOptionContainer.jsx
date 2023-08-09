import { Box } from "@mui/material";
import { SelectMenuCtx } from ".";
import { Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel } from '@mui/material';
import AdditionalOptions from "./AdditionalOptions";

export default function AdditionalOptionContainer() {
    const selectMenuContext = SelectMenuCtx();
    const { handleAddOption,  additionalOptions } = selectMenuContext;
    console.log('additionalOptions: ', additionalOptions);

    return (
        <Box className="additionalOptions">
            <button onClick={ handleAddOption }>확인</button>
            {additionalOptions && additionalOptions.map(option => 
                <AdditionalOptions key={option.name} option={option} />
            )}
        </Box>
    )
}