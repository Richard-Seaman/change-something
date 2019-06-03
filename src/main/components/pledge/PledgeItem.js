import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import CostLevel from "./CostLevel";

const styles = theme => ({
  paper: {
    padding: "8px",
    textAlign: "left"
  }
});

const PledgeItem = props => {
  const { classes, pledge, isChecked, onChecked } = props;
  return (
    <Paper className={classes.paper}>
      {pledge.title && (
        <Typography variant="h6" className={classes.title}>
          {pledge.title}
        </Typography>
      )}
      {pledge.desc && <Typography variant="body2">{pledge.desc}</Typography>}
      <Checkbox
        checked={isChecked || false}
        onChange={onChecked}
        value={pledge.id}
      />
      <CostLevel level={pledge.cost} />
    </Paper>
  );
};

PledgeItem.propTypes = {
  classes: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
  pledge: PropTypes.object.isRequired
};

export default withStyles(styles)(PledgeItem);
