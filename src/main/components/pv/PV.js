import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";

const styles = theme => {
  return {};
};

class PV extends Component {
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.pv);
  }

  render() {
    return <div />;
  }
}

PV.propTypes = {
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
)(PV);
