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
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: 'black',
                    fontSize: '1.0rem',
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export default theme;