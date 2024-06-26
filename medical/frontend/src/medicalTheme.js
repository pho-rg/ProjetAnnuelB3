// theme et couleurs de l'application
import { createTheme } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';
import {lightGreen} from '@mui/material/colors';

const medicalTheme = createTheme({
    palette: {
        primary: {
            main: lightGreen[400],
            contrastText: '#ffffff',
        },
        secondary: {
            main: lightGreen[700],
            contrastText: '#ffffff',
        },
        error: {
            main: '#d12a2a',
            contrastText: '#ffffff',
        },
        default: {
            main: lightGreen[400],
        },
        text: {
            primary : '#33691e',
            secondary : '#295418',
            disabled : '#204213',
        },
    },
    typography: {
        fontFamily: 'Montserrat'
    },
    components: {
        // MuiTextField : {
        //     styleOverrides : {
        //         root : {
        //             backgroundColor: '#004d40',
        //         }
        //     }
        // }
    }
}, frFR);

export default medicalTheme;