import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import Reward from "react-rewards";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MUIRichTextEditor from "mui-rte";
import TextField from "@material-ui/core/TextField";

import { paths } from "../../routes/constants";
import {
  addPledge,
  updatePledge,
  deletePledge
} from "../../store/actions/PledgeActions";
import { setFormData } from "../../store/actions/FormActions";

const styles = theme => ({
  summaryTextContainer: {
    flexDirection: "column"
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "center"
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
  },
  buttonsContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    marginLeft: "8px",
    marginRight: "8px"
  }
});

class PledgeItem extends React.Component {
  state = {
    editMode: false,
    haveSetFormState: false
  };

  handleToggleEdit = () => {
    const { editMode, haveSetFormState } = this.state;
    const { onSetFormData, pledge } = this.props;
    const stateUpdates = { editMode: !editMode };
    if (pledge && !haveSetFormState) {
      onSetFormData(pledge.id, "descRt", pledge.descRt || {});
      stateUpdates["haveSetFormState"] = true;
    }
    this.setState(stateUpdates);
  };

  handleEditPledge = pledge => {
    const { history } = this.props;
    history.push(`${paths.pledges}/${pledge.id}`);
  };

  handleSaveText = data => {
    console.log(data);
  };

  render() {
    const {
      classes,
      pledge,
      onAddCommitment,
      onDeleteCommitment,
      commitment,
      claims
    } = this.props;
    const { editMode } = this.state;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.summaryTextContainer}>
            {editMode ? (
              <TextField
                fullWidth={true}
                //error={!config.valid && config.touched}
                id={"title"}
                value={pledge.title || ""}
                margin="normal"
              />
            ) : (
              <Typography className={classes.heading}>
                {pledge.title}
              </Typography>
            )}
            <Typography
              className={classes.commitmentsText}
            >{`${pledge.counter || 0} ${
              pledge.counter === 1 ? "commitment" : "commitments"
            }`}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.detailsContainer}>
          {pledge.descRt && (
            <MUIRichTextEditor
              label="Start typing..."
              onSave={this.handleSaveText}
              value={JSON.stringify(pledge.descRt)}
              readOnly={!editMode}
              controls={[
                "bold",
                "italic",
                "underline",
                "link",
                "numberList",
                "bulletList",
                "quote",
                "code"
              ]}
            />
          )}
          {!pledge.descRt &&
            pledge.desc.map((para, idx) => {
              return (
                <Typography
                  className={classes.detailsText}
                  key={`desc[${idx}]`}
                >
                  {para}
                </Typography>
              );
            })}
          <div className={classes.buttonsContainer}>
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
                className={classes.button}
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
            {claims.moderator && (
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => this.handleToggleEdit()}
              >
                {editMode ? "Cancel" : "Edit Mode"}
              </Button>
            )}
            {editMode && (
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => this.handleToggleEdit()} // TODO
              >
                Save
              </Button>
            )}
          </div>
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

const mapStateToProps = (state, ownProps) => {
  const { pledge } = ownProps;
  return {
    claims: state.login.claims,
    formData: pledge ? state.forms[pledge.id] : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPledge: pledge => dispatch(addPledge(pledge)),
    onUpdatePledge: pledge => dispatch(updatePledge(pledge)),
    onDeletePledge: pledge => dispatch(deletePledge(pledge)),
    onSetFormData: (objectKey, fieldKey, value) =>
      dispatch(setFormData(objectKey, fieldKey, value))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(PledgeItem);
