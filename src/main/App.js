import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";

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
    secondary: orange
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
