import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});

const Level = props => {
  const { classes, level, symbol, max } = props;
  const icons = [];
  for (let i = 0; i < level && i < max; i++) {
    icons.push(
      <Icon key={`level${i}`} color="action" fontSize="small">
        {symbol}
      </Icon>
    );
  }
  if (icons.length < 1) {
    icons.push(
      <Icon key={`levelFree`} color="action" fontSize="small">
        remove
      </Icon>
    );
  }
  return <div className={classes.container}>{icons}</div>;
};

Level.defaultProps = {
  max: 5
};

Level.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  max: PropTypes.number
};

export default withStyles(styles)(Level);
