import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";
import { commonStyles } from "../../styles";
import { typoProps } from "../../constants";
import { sendMail } from "../../store/actions/ContactActions";

import ValidatedField from "../widgets/ValidatedField";
import { VALIDATORS_BY_NAME } from "../../constants";
import { Typography } from "@material-ui/core";
import { showLogin } from "../../store/actions/LoginActions";

const styles = theme => ({
  ...commonStyles,
  buttonsContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginLeft: "8px",
    marginRight: "8px"
  }
});

class Contact extends Component {
  constructor(props) {
    super(props);
    const initialState = { message: "" };
    this.state = initialState;
  }

  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.contact);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  renderContactForm() {
    const { classes, email, name, onSendMail } = this.props;
    const { message } = this.state;
    const commonProps = {
      inputProps: { className: classes.textFieldContainer },
      className: classes.textField,
      fullWidth: true
    };

    return (
      <Grid container spacing={2} direction="row" justify="center">
        <Grid item xs={12}>
          <Typography {...typoProps.subTitle} className={classes.subTitle}>
            We'd love to hear from you!
          </Typography>
          <Typography {...typoProps.para} className={classes.para}>
            Use the contact form below to send us a message.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ValidatedField
            id="name"
            name="name"
            label="Name"
            value={name}
            disabled={true}
            validators={[VALIDATORS_BY_NAME.REQUIRED]}
            {...commonProps}
          />
        </Grid>
        <Grid item xs={6}>
          <ValidatedField
            id="email"
            name="email"
            label="Email"
            value={email}
            disabled={true}
            validators={[VALIDATORS_BY_NAME.REQUIRED]}
            {...commonProps}
          />
        </Grid>
        <Grid item xs={12}>
          <ValidatedField
            id="message"
            name="message"
            label="Message"
            value={message}
            validators={[VALIDATORS_BY_NAME.REQUIRED]}
            {...commonProps}
            multiline={true}
            variant={"outlined"}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => onSendMail()}
            >
              Send Email
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }

  renderSignIn() {
    const { classes, onShowLogin } = this.props;
    return (
      <Grid container spacing={2} direction="row" justify="center">
        <Grid item xs={12}>
          <Typography {...typoProps.subTitle} className={classes.subTitle}>
            We'd love to hear from you!
          </Typography>
          <Typography>You must sign in to use the contact form</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={onShowLogin}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, email } = this.props;
    return (
      <div className={classes.textPageRoot}>
        {email ? this.renderContactForm() : this.renderSignIn()}
      </div>
    );
  }
}

Contact.propTypes = {
  onSetTitle: PropTypes.func.isRequired,
  onShowLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    email: state.firebase.auth.email,
    name: state.firebase.auth.displayName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowLogin: () => dispatch(showLogin()),
    onSetTitle: title => dispatch(setTitle(title)),
    onSendMail: () => dispatch(sendMail())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Contact);
