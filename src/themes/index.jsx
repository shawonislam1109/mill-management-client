// ThemeCustomization.js
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  darken,
  lighten,
  getContrastRatio,
} from "@mui/material/styles";
import PropTypes from "prop-types";

const ThemeCustomization = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: "light",
      // primary: {
      //   main: darken("#ffffff", 0.2),
      // },
      // secondary: {
      //   main: lighten("#ff4081", 0.2), // example usage of lighten
      // },
      // background: {
      //   default: "#121212",
      //   paper: "#1d1d1d",
      // },
      // text: {
      //   primary: "#ffffff",
      //   secondary: "#bbbbbb",
      //   contrastText:
      //     getContrastRatio("#ffffff", "#121212") > 3 ? "#ffffff" : "#000000",
      // },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 300,
        lineHeight: 1.2,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 300,
        lineHeight: 1.3,
        margin: "0.75rem 0",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 400,
        lineHeight: 1.4,
        margin: "0.75rem 0",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 0.5,
        margin: "0.5rem 0",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.6,
        margin: "0.5rem 0",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.7,
        margin: "0.5rem 0",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      button: {
        textTransform: "none",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    shape: {
      borderRadius: 2,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              borderRadius: 4,
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "1rem",
              color: "#333",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#aaa",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#3f51b5",
              },
            },
          },
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

export default ThemeCustomization;
