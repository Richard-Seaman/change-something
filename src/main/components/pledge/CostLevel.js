import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";

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
    icons.push(<Icon key={`costLevel${i}`}>euro_symbol</Icon>);
  }
  if (icons.length < 1) {
    icons.push(
      <Typography key={`costLevelFree`} variant="body2">
        No Cost
      </Typography>
    );
  }
  return <div className={classes.container}>{icons}</div>;
};

CostLevel.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired
};

export default withStyles(styles)(CostLevel);
