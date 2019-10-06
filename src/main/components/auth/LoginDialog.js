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
import { titles } from "../../navigation/navItems";
import { toastSuccess, toastError } from "../../store/actions/ToastActions";

const styles = theme => ({
  socialButtonsContainer: {
    margin: "30px auto 0 auto",
    maxWidth: "250px"
  },
  dataProtectionLinkContainer: {
    display: "flex",
    justifyContent: "center",
    fontSize: "small",
    marginTop: "8px",
    color: "blue",
    cursor: "pointer"
  }
});

class LoginDialog extends Component {
  handleLogout = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  handleLoginSuccess = res => {
    const { onHideLogin, onToastSuccess } = this.props;
    onToastSuccess("Signed in successfully!");
    onHideLogin();
  };

  handleLoginError = err => {
    const { onHideLogin, onToastError } = this.props;
    console.error("Sign in failed!", err);
    onToastError("Oops, something went wrong!");
    onHideLogin();
  };

  handleShowDataProtection = () => {
    const { onHideLogin, history } = this.props;
    onHideLogin();
    history.push("/privacy");
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
    const { firebase, classes, title } = this.props;
    const isSignInForContact = title === titles.contact;
    return (
      <Fragment>
        <DialogTitle id="form-dialog-title">{"Sign In"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSignInForContact
              ? "You must sign in to use the contact form."
              : "You must sign in to make a commitment."}
          </DialogContentText>
          {!isSignInForContact && (
            <div>
              <DialogContentText>Signing in ensures that:</DialogContentText>
              <ul>
                <li>
                  <DialogContentText>
                    real people are making real commitments
                  </DialogContentText>
                </li>
                <li>
                  <DialogContentText>
                    your commitments are stored for your next visit
                  </DialogContentText>
                </li>
                <li>
                  <DialogContentText>
                    commitments are only counted once
                  </DialogContentText>
                </li>
              </ul>
            </div>
          )}
          <div className={classes.socialButtonsContainer}>
            <GoogleLoginButton
              onClick={() =>
                firebase
                  .login({ provider: "google", type: "popup" })
                  .then(res => this.handleLoginSuccess(res))
                  .catch(err => this.handleLoginError(err))
              }
            />
            <FacebookLoginButton
              onClick={() =>
                firebase
                  .login({ provider: "facebook", type: "popup" })
                  .then(res => this.handleLoginSuccess(res))
                  .catch(err => this.handleLoginError(err))
              }
            />
            <div
              className={classes.dataProtectionLinkContainer}
              onClick={this.handleShowDataProtection}
            >
              <u>Data Protection Policy</u>
            </div>
          </div>
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
                Sign Out
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
    isOpen: state.login.isOpen,
    title: state.nav.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHideLogin: () => dispatch(hideLogin()),
    onToastSuccess: message => dispatch(toastSuccess(message)),
    onToastError: message => dispatch(toastError(message))
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
