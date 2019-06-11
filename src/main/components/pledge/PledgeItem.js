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

import Level from "./Level";

const styles = theme => ({
  card: {},
  firstButton: {
    marginLeft: "auto"
  },
  cardHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    alignItems: "center"
  },
  cardHeaderTextContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "2"
  },
  cardHeaderSymbolContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "16px"
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
        <div className={classes.cardHeaderContainer}>
          <div className={classes.cardHeaderTextContainer}>
            <CardHeader
              title={pledge.title}
              subheader={`${pledge.counter || 0} ${
                pledge.counter === 1 ? "commitment" : "commitments"
              }`}
            />
          </div>
          <div className={classes.cardHeaderSymbolContainer}>
            <Level level={pledge.cost} symbol="euro_symbol" />
            <Level level={pledge.effort} symbol="fitness_center" />
            <Level level={pledge.reward} symbol="grade" />
          </div>
        </div>
        <CardContent>
          {pledge.desc && (
            <Typography variant="body2" color="textSecondary" component="p">
              {pledge.desc}
            </Typography>
          )}
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
