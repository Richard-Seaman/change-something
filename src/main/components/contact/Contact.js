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
import { pixels } from "../../constants";
import { sendMail } from "../../store/actions/ContactActions";

import ValidatedField from "../widgets/ValidatedField";
import { VALIDATORS_BY_NAME } from "../../constants";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  ...commonStyles,
  root: {
    display: "flex",
    flexGrow: 1,
    marginTop: pixels.gobalSpacing,
    flexDirection: "column",
    paddingBottom: "16px",
    paddingLeft: pixels.gobalSpacing,
    paddingRight: pixels.gobalSpacing,
    maxWidth: "1500px"
  },
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
    return <Typography>You must sign in to use the contact form</Typography>;
  }

  render() {
    const { classes, email } = this.props;
    return (
      <div className={classes.root}>
        {email ? this.renderContactForm() : this.renderSignIn()}
      </div>
    );
  }
}

Contact.propTypes = {
  onSetTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    email: state.firebase.auth.email,
    name: state.firebase.auth.displayName
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
