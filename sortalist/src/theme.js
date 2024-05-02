// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#3d5afe',
        },
    },
    typography: {
        fontFamily: 'Lato, Arial, sans-serif',
    },
});

export default theme;