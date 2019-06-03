import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

import CostLevel from "./CostLevel";

const styles = theme => ({
  card: {},
  firstButton: {
    marginLeft: "auto"
  }
});

const PledgeItem = props => {
  const { classes, pledge, isChecked, onChecked, onMakeCommitment } = props;
  return (
    <Card className={classes.card}>
      <CardHeader title={pledge.title} subheader={"# commitments"} />
      <CardContent>
        {pledge.desc && (
          <Typography variant="body2" color="textSecondary" component="p">
            {pledge.desc}
          </Typography>
        )}

        <CostLevel level={pledge.cost} />
      </CardContent>
      <CardActions>
        <Button className={classes.firstButton} size="small" color="primary">
          Learn More
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => onMakeCommitment(pledge.id)}
        >
          Make Commitment
        </Button>
      </CardActions>
    </Card>
  );
};

PledgeItem.propTypes = {
  classes: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
  pledge: PropTypes.object.isRequired,
  onMakeCommitment: PropTypes.func.isRequired
};

export default withStyles(styles)(PledgeItem);
