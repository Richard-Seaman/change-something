import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Reward from "react-rewards";

import CostLevel from "./CostLevel";

const styles = theme => ({
  card: {},
  firstButton: {
    marginLeft: "auto"
  }
});

class PledgeItem extends React.Component {
  render() {
    const {
      classes,
      pledge,
      onAddCommitment,
      onDeleteCommitment,
      commitment
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={pledge.title}
          subheader={`${pledge.counter || 0} commitments`}
        />
        <CardContent>
          {pledge.desc && (
            <Typography variant="body2" color="textSecondary" component="p">
              {pledge.desc}
            </Typography>
          )}
          <CostLevel level={pledge.cost} />
        </CardContent>
        <CardActions>
          <Button
            className={classes.firstButton}
            size="small"
            color="primary"
            onClick={() => alert("Not ready yet...")}
          >
            Learn More
          </Button>
          <Reward
            ref={ref => {
              this.reward = ref;
            }}
            type={commitment ? "emoji" : "confetti"}
            config={{
              emoji: commitment
                ? ["😡", "🔥", "❓", "❗"]
                : ["♻️", "🌈", "☀️", "🌱"],
              elementSize: commitment ? 30 : 15
            }}
          >
            <Button
              size="small"
              color={commitment ? "secondary" : "primary"}
              onClick={
                commitment
                  ? () => {
                      this.reward.rewardMe();
                      onDeleteCommitment(commitment);
                    }
                  : () => {
                      this.reward.rewardMe();
                      onAddCommitment(pledge.id);
                    }
              }
            >
              {commitment ? "Revoke Commitment" : "Make Commitment"}
            </Button>
          </Reward>
        </CardActions>
      </Card>
    );
  }
}

PledgeItem.propTypes = {
  classes: PropTypes.object.isRequired,
  pledge: PropTypes.object.isRequired,
  onAddCommitment: PropTypes.func.isRequired,
  onDeleteCommitment: PropTypes.func.isRequired
};

export default withStyles(styles)(PledgeItem);
