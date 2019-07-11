import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { setTitle } from "../store/actions/NavActions";

import ValidatedField from "./widgets/ValidatedField";
import { VALIDATORS_BY_NAME } from "../constants";

const styles = theme => {
  return {};
};

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "Seaman"
    };
  }
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle("Test");
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    const { lastName } = this.state;
    const commonProps = {
      inputProps: { className: classes.textFieldContainer },
      onChange: this.handleChange,
      className: classes.textField,
      validators: [VALIDATORS_BY_NAME.REQUIRED]
    };
    return (
      <div>
        <ValidatedField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={lastName}
          {...commonProps}
        />
      </div>
    );
  }
}

Test.propTypes = {
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
)(Test);
