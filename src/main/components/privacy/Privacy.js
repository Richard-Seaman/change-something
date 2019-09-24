import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";
import { pixels, typoProps } from "../../constants";
import { commonStyles } from "../../styles";

const styles = theme => {
  return {
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
    }
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
      <div className={classes.root}>
        <Typography {...typoProps.para} className={classes.para}>
          Facebook or Google verification is used to ensure that robots are not
          making commitments. We will never pass on your details to third
          parties or use your details to advertise any commercial services to
          you. We may very occasionally send you updates relating to this
          campaign but will never offer any service or products or ask for any
          form of payment.
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
