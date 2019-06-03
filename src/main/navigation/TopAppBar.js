import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import LoginDialog from "../components/auth/LoginDialog";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";

import { showLogin, hideLogin } from "../store/actions/LoginActions";

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
  handleCloseLogin = () => {
    const { onHideLogin } = this.props;
    onHideLogin();
  };

  handleOpenLogin = () => {
    const { onShowLogin } = this.props;
    onShowLogin();
  };

  render() {
    const { classes, isOpen } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Change Something
            </Typography>
            <IconButton
              aria-haspopup="true"
              onClick={this.handleOpenLogin}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LoginDialog open={isOpen} handleClose={this.handleCloseLogin} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpen: state.login.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onHideLogin: () => dispatch(hideLogin())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(TopAppBar);
