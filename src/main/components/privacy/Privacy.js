import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

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
          Short and sweet...
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Facebook or Google verification is used to ensure that robots are not
          making commitments.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          We will never pass on your details to third parties or use your
          details to advertise any commercial services to you.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          We may very occasionally send you updates relating to this campaign
          but will never offer any service or products or ask for any form of
          payment.
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
