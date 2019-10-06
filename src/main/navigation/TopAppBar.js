import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import LoginDialog from "../components/auth/LoginDialog";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import MenuIcon from "@material-ui/icons/Menu";

import { showLogin } from "../store/actions/LoginActions";
import { showNavDrawer } from "../store/actions/NavActions";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "8px"
  },
  title: {
    flexGrow: 1
  }
});

class TopAppBar extends React.Component {
  render() {
    const {
      classes,
      onShowLogin,
      onShowNavDrawer,
      title,
      history
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={onShowNavDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <IconButton
              aria-haspopup="true"
              onClick={onShowLogin}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LoginDialog history={history} />
      </div>
    );
  }
}

TopAppBar.propTypes = {
  onShowLogin: PropTypes.func.isRequired,
  onShowNavDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    title: state.nav.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onShowNavDrawer: () => dispatch(showNavDrawer())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(TopAppBar);
