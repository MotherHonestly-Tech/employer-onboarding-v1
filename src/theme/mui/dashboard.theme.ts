import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';


export const theme = createTheme({
  palette: {
    primary: {
      main: '#28404A'
    },
    secondary: {
      main: '#EEEEEE'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          fontSize: 13,
          fontFamily: 'Avenir-Book',
          borderRadius: 0,
          boxShadow: 'none',
          textTransform: 'none',
          padding: '6px 12px',
          ':hover': {
            backgroundColor: '#28404A'
          },
          ':active': {
            backgroundColor: '#28404A'
          },
          transition: '0.32s ease-out'
        }
      },
      defaultProps: {
        // disableRipple: true
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 10px 16px 0px rgba(154, 154, 154, 0.13)'
        }
      },
      defaultProps: {
        square: true
      }
    }
  }
});
