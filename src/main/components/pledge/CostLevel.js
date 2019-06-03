import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row"
  }
});

const CostLevel = props => {
  const { classes, level } = props;
  const icons = [];
  for (let i = 0; i < level; i++) {
    icons.push(<Icon>euro_symbol</Icon>);
  }
  if (icons.length < 1) {
    icons.push("Free");
  }
  return <div className={classes.container}>{icons}</div>;
};

CostLevel.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired
};

export default withStyles(styles)(CostLevel);
