import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

import { commonStyles } from "../../styles";

const styles = {
  ...commonStyles,
  formControl: {
    marginTop: "16px",
    marginBottom: "8px",
    width: "100%"
  },
  textFieldContainer: {
    borderBottom: "none"
  }
};

function RemoteOptionsSelect({
  classes,
  error,
  id,
  value,
  values,
  optionValue,
  optionName,
  label,
  handleChange,
  overrideClassName,
  inputConfig,
  selectConfig,
  labelConfig,
  helperText,
  disabled
}) {
  let options = null;

  if (values && Object.getOwnPropertyNames(values).length !== 0) {
    options = values.map((v, idx) => {
      return (
        <MenuItem
          key={`${idx}optionName`}
          value={optionValue ? v[optionValue] : v}
          disabled={v.disabled}
          classes={{
            root: classes.menuItemRoot,
            selected: classes.menuItemSelected
          }}
        >
          {v[optionName]}
        </MenuItem>
      );
    });
  }
  return values ? (
    <FormControl
      className={overrideClassName || classes.formControl}
      error={!!error}
      variant="standard"
      disabled={disabled}
    >
      <InputLabel {...labelConfig} htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        value={value || ""}
        name={id}
        onChange={handleChange}
        inputProps={{ className: classes.textFieldContainer }}
        input={<Input name={id} id={id} readOnly={false} {...inputConfig} />}
        {...selectConfig}
      >
        {options}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormHelperText> {error}</FormHelperText>}
    </FormControl>
  ) : null;
}

RemoteOptionsSelect.defaultProps = {
  disabled: false
};

RemoteOptionsSelect.propTypes = {
  optionName: PropTypes.string.isRequired,
  optionValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errorPath: PropTypes.string,
  changeParameter: PropTypes.string,
  classes: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  values: PropTypes.array,
  handleChange: PropTypes.func,
  overrideClassName: PropTypes.string,
  inputConfig: PropTypes.object,
  selectConfig: PropTypes.object,
  labelConfig: PropTypes.object,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

export default withStyles(styles)(RemoteOptionsSelect);
