import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Reward from "react-rewards";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  summaryTextContainer: {
    flexDirection: "column"
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  commitButton: {
    marginTop: "16px"
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular
  },
  commitmentsText: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightLight
  },
  detailsText: {
    marginBottom: "8px",
    alignSelf: "flex-start"
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
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.summaryTextContainer}>
            <Typography className={classes.heading}>{pledge.title}</Typography>
            <Typography
              className={classes.commitmentsText}
            >{`${pledge.counter || 0} ${
              pledge.counter === 1 ? "commitment" : "commitments"
            }`}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detailsContainer}>
          {pledge.desc.map((para, idx) => {
            return (
              <Typography className={classes.detailsText} key={`desc[${idx}]`}>
                {para}
              </Typography>
            );
          })}
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
              className={classes.commitButton}
              variant="outlined"
              color={commitment ? "secondary" : "primary"}
              onClick={
                commitment
                  ? () => {
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
