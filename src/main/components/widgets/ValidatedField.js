import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";

import RemoteOptionsSelect from "../common/RemoteOptionsSelect";
import {
  createField,
  clearError,
  validateField
} from "../../store/actions/ValidationActions";
import { fieldErrorSelector } from "../../store/selectors/validationField";

class ValidatedField extends React.Component {
  typingTimeout = null;

  typingTimeoutDuration = 500;

  componentDidMount() {
    const { createField, id, label, validators, value } = this.props;

    createField({ id, label, validators, text: value });
  }

  componentDidUpdate(prevProps) {
    const { createField, id, validators, value, label } = this.props;

    if (!prevProps.value && value) {
      createField({ id, validators, label, text: value });
    }
  }

  componentWillUnmount() {
    const { id, clearError } = this.props;

    clearError(id);
  }

  validate = text => {
    const { validators, id, label } = this.props;

    this.props.validateField({ text, id, label, validators });
  };

  handleChange = event => {
    const { id, error, onChange, clearError } = this.props;

    if (error) clearError(id);

    onChange(event);
    const { value } = event.target;

    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {
      this.validate(value);
    }, this.typingTimeoutDuration);
  };

  render() {
    // Destruct unused props so that they are not passed down to TextField and Select components
    /* eslint-disable */
    const {
      optionName,
      optionValue,
      error,
      type,
      disabled,
      createField,
      onChange,
      clearError,
      validateField,
      ...rest
    } = this.props;
    /* eslint-enable */
    const helperText = error || rest.helperText || "";
    const errorProp = error || false;

    if (type === "text") {
      return (
        <TextField
          {...rest}
          onChange={this.handleChange}
          helperText={helperText}
          error={!!errorProp}
          disabled={disabled}
        />
      );
    }

    if (type === "select") {
      return (
        <RemoteOptionsSelect
          {...rest}
          optionName={optionName}
          optionValue={optionValue}
          handleChange={this.handleChange}
          error={errorProp}
          disabled={disabled}
        />
      );
    }

    return null;
  }
}

ValidatedField.defaultProps = {
  type: "text",
  variant: "filled",
  margin: "normal",
  className: "",
  helperText: "",
  validators: "",
  values: [],
  optionName: "",
  optionValue: "",
  error: null,
  inputProps: null,
  onChange: () => {},
  disabled: false
};

ValidatedField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  createField: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  validateField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  validators: PropTypes.array,
  variant: PropTypes.string,
  value: PropTypes.any,
  values: PropTypes.array,
  optionName: PropTypes.string,
  optionValue: PropTypes.string,
  type: PropTypes.string,
  margin: PropTypes.string,
  className: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  inputProps: PropTypes.object,
  disabled: PropTypes.bool
};

const mapStateToProps = (state, ownProps) =>
  fieldErrorSelector(state, ownProps.id);

export default compose(
  connect(
    mapStateToProps,
    {
      createField,
      clearError,
      validateField
    }
  )
)(ValidatedField);
