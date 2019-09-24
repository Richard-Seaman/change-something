import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";

import store from "./store/Store";
import BaseLayout from "./layouts/BaseLayout";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#E8F5E9",
      main: "#4CAF50",
      dark: "#1B5E20",
      contrastText: "#FFFFFF"
    },
    secondary: {
      ...orange,
      contrastText: "#FFFFFF"
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "p",
        body2: "span"
      }
    }
  }
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <BaseLayout />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
);
export default App;
