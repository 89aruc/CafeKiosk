import { IconButton } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export default function VoiceRecorder({ onClick }) {

    return (
    <IconButton onClick={onClick}
        className="voiceBtn">
        <KeyboardVoiceIcon sx={{fontSize: '5rem'}} />
    </IconButton>
    )
}