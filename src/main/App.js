import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import store from "./store/Store";
import BaseLayout from "./layouts/BaseLayout";

import orange from "@material-ui/core/colors/orange";

const hist = createBrowserHistory();

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
    <Router history={hist}>
      <MuiThemeProvider theme={theme}>
        <BaseLayout />
      </MuiThemeProvider>
    </Router>
  </Provider>
);
export default App;
