import { createTheme } from '@mui/material/styles';
import { red, common } from '@mui/material/colors';

const primaryColor = '#28404A';

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: common.white
    },
    secondary: {
      main: '#F4EE46',
      light: '#B6B6B6'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#F5F5F5',
      paper: common.white
    }
    // action: {
    //   active: primaryColor,
    //   hover: primaryColor,
    //   selected: primaryColor,
    //   disabled: '#F5F5F5',
    //   disabledBackground: '#F5F5F5',
    //   focus: primaryColor,
    // }
  },
  typography: {
    fontFamily: 'Avenir-Book, sans-serif',
    // fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
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
            backgroundColor: '#F2EC2C',
            color: primaryColor
          },
          ':active': {
            backgroundColor: '#F2EC2C',
            color: primaryColor
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
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '1.6rem',
          fontFamily: 'Gilroy-Bold',
          color: primaryColor
        },
        h2: {
          fontSize: '1.4rem',
          fontFamily: 'Gilroy-Bold',
          color: primaryColor
        },
        h3: {
          fontSize: '1.2rem',
          fontFamily: 'Gilroy-Bold',
          color: primaryColor
        },
        h4: {
          fontSize: '1rem',
          fontFamily: 'Gilroy-Bold',
          color: primaryColor
        },
        subtitle1: {
          fontSize: '1rem',
          fontFamily: 'Gilroy-Regular',
          color: '#6F6F6F',
          fontWeight: 300
        },
        subtitle2: {
          fontSize: '1rem',
          fontFamily: 'Gilroy-Regular',
          color: '#B9B9B9',
          fontWeight: 300
        },
        body1: {
          fontSize: '0.85rem',
          fontFamily: 'Avenir-Book',
          color: '#717171'
        },
        body2: {
          fontSize: '0.85rem',
          fontFamily: 'Avenir-Book',
          color: '#717171',
          fontWeight: 300
        }
      },
      defaultProps: {}
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: common.white,
          boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
          paddingBlock: 7
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: common.white,
          opacity: 1
        }
      }
    }
    // MuiTable: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: common.white,
    //       boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //       paddingBlock: 7,
    //       borderRadius: 0,
    //       border: 'none',
    //       '&:hover': {
    //         backgroundColor: common.white,
    //         boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //         paddingBlock: 7,
    //         borderRadius: 0,
    //         border: 'none',
    //         display: 'table',
    //         width: '100%',
    //         height: '100%',
    //         cursor: 'pointer'
    //       }
    //     }
    //   }
    // },
    // MuiTableCell: {
    //   styleOverrides: {
    //     root: {
    //       padding: '0px',
    //       border: 'none',
    //       borderRadius: 0,
    //       backgroundColor: common.white,
    //       boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //       '&:hover': {
    //         backgroundColor: common.white,
    //         boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)',
    //         paddingBlock: 7,
    //         borderRadius: 0,
    //         border: 'none',
    //         display: 'table',
    //         width: '100%',
    //         height: '100%',
    //         cursor: 'pointer',
    //         '& $content': {
    //           color: primaryColor,
    //           fontWeight: 'bold',
    //           fontSize: '0.85rem',
    //           fontFamily: 'Avenir-Book',
    //           textTransform: 'uppercase',
    //           padding: '0px',
    //           border: 'none',
    //           borderRadius: 0,
    //           backgroundColor: common.white,
    //           boxShadow: '0px 4px 15px rgba(221, 221, 221, 0.25)'
    //         }
    //       }
    //     }
    //   }
    // }
  }
});
