import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import {
  GoogleLoginButton,
  FacebookLoginButton
} from "react-social-login-buttons";

import { hideLogin } from "../../store/actions/LoginActions";

const styles = theme => ({});

class LoginDialog extends Component {
  handleLogout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  renderLoggedIn = () => {
    const { auth } = this.props;
    const email = auth.email;
    const name = auth.displayName;
    return (
      <Fragment>
        <DialogTitle id="form-dialog-title">Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>You are signed in as:</DialogContentText>
          {name && <DialogContentText>{`${name}`}</DialogContentText>}
          {email && <DialogContentText>{`${email}`}</DialogContentText>}
        </DialogContent>
      </Fragment>
    );
  };

  renderLoggedOut = () => {
    const { firebase } = this.props;
    return (
      <Fragment>
        <DialogTitle id="form-dialog-title">{"Sign In"}</DialogTitle>
        <DialogContent>
          <GoogleLoginButton
            onClick={() =>
              firebase.login({ provider: "google", type: "popup" })
            }
          />
          <FacebookLoginButton
            onClick={() =>
              firebase.login({ provider: "facebook", type: "popup" })
            }
          />
        </DialogContent>
      </Fragment>
    );
  };

  render() {
    const { isOpen, onHideLogin, auth } = this.props;
    const uid = auth.uid;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={onHideLogin}
          aria-labelledby="form-dialog-title"
        >
          {!uid && this.renderLoggedOut()}
          {uid && this.renderLoggedIn()}
          <DialogActions>
            <Button onClick={onHideLogin} color="primary">
              Close
            </Button>
            {uid && (
              <Button onClick={this.handleLogout} color="primary">
                Logout
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  auth: PropTypes.object,
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onHideLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    isOpen: state.login.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHideLogin: () => dispatch(hideLogin())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect(),
  withStyles(styles)
)(LoginDialog);
