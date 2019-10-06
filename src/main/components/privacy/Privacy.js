import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";
import { typoProps } from "../../constants";
import { commonStyles } from "../../styles";

const styles = theme => {
  return {
    ...commonStyles
  };
};

class Privacy extends Component {
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.privacy);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.textPageRoot}>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Data Protection Policy
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Your privacy is important to us and every effort will be made to
          protect any data provided to us. Data is used in the following way:
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          When you log onto the site using your facebook or google account, the
          website will be provided with a unique ID reference that allows the
          website to know when you return to the site in future. This is only
          used so that the website can show you which changes you have
          committed. It is not provided to any third party and is not used in
          any way to target advertising. We may also be provided with your email
          address if you have allowed the transfer of that information within
          your google or facebook accounts. The ID and email address will be
          stored in a secure database. It will never be given to any third party
          for any reason. We may occasionally send you an email reminding you of
          the commitments made but emails would only be sent on very rare
          occasions. Any email sent will also contain the option to permanently
          unsubscribe from our email list.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          If donating to the Photovoltaic crowdfund campaign, all financial
          information will be handled directly on the Paypal website. We will
          never receive and will never store any of your banking information.
          Paypal will provide your name, email address and if you choose to
          enter it your home address may be provided (this can be left blank as
          it is not required). The email address will be stored and used to
          contact you should the opportunity arise to offer you funding. We may
          very rarely send an email reminding of the campaign or letting you
          know how it is progressing. Any such email will be sent only
          occasionally and will contain an unsubscribe option.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          If you have any queries about how your data is stored or handled,
          please do not hesitate to <Link to="/contact">contact us</Link>.
        </Typography>
      </div>
    );
  }
}

Privacy.propTypes = {
  onSetTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTitle: title => dispatch(setTitle(title))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Privacy);
