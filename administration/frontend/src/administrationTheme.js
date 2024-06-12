import { createTheme } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';
import {lightBlue, lightGreen} from '@mui/material/colors';

const administrationTheme = createTheme({
    palette: {
        primary: {
            //main: lightBlue['#6FA2F8'],
            main: '#6FA2F8',
            contrastText: 'white',
        },
        secondary: {
            main: '#88AFED',
            contrastText: 'white',
        },
        error: {
            main: '#d12a2a',
            contrastText: '#ffffff',
        },
        default: {
            main: '#6FA2F8',
        },
        text: {
            primary : '#A1BAE2',
            secondary : '#88AFED',
            disabled : '#6FA2F8',
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

export default administrationTheme;