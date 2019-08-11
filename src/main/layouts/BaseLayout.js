import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import renderRoutes from "../routes/renderRoutes";
import pageRoutes from "../routes/pageRoutes";
import TopAppBar from "../navigation/TopAppBar";
import NavDrawer from "../navigation/NavDrawer";
import { pixels } from "../constants";

const styles = theme => ({
  baseLayoutContainer: {
    background: theme.palette.primary.light,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100vh",
    width: "100%"
  },
  baseLayoutContentContainer: {
    height: pixels.contentHeight,
    overflow: "auto"
  },
  baseLayoutPageContainer: {
    paddingLeft: pixels.gobalSpacing,
    paddingRight: pixels.gobalSpacing,
    display: "flex",
    margin: "0 auto"
  }
});

class BaseLayout extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div className={classes.baseLayoutContainer}>
        <TopAppBar />
        <NavDrawer history={history} />
        <div className={classes.baseLayoutContentContainer}>
          <div className={classes.baseLayoutPageContainer}>
            <Switch>{renderRoutes(pageRoutes)}</Switch>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(BaseLayout);
