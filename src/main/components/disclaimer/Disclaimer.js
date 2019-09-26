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

class Disclaimer extends Component {
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.disclaimer);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Take note...
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Nothing on this site shall be construed as legal, financial or
          construction advice. Individuals take full responsibility for any
          action taken as a result of reading this website or committing to any
          actions as a result. Any construction or DIY activity has associated
          risks and should only be carried out by a competent individual.
        </Typography>
      </div>
    );
  }
}

Disclaimer.propTypes = {
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
)(Disclaimer);
