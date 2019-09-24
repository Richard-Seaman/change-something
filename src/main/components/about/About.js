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

class About extends Component {
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.about);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography {...typoProps.para} className={classes.para}>
          This is a not for profit organisation. No payments are (or will ever)
          be made to its members and all expenses are paid directly by our
          volunteers.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The organisation is organic which means that anyone can join and
          promote the concept. Simply by committing to change something and
          telling someone else about the site, you have become a member!
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          This campaign has been initiated by Chris Croly and Richard Seaman
          both of whom are qualified engineers with a background in energy
          management.
        </Typography>
      </div>
    );
  }
}

About.propTypes = {
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
)(About);
