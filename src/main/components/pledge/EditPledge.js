import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";

import {
  addPledge,
  updatePledge,
  deletePledge
} from "../../store/actions/PledgeActions";
import { commonStyles } from "../../styles";
import { queries } from "../../store/firebaseConfig";
import { isNew, paths } from "../../routes/constants";
import { pixels } from "../../constants";

import ValidatedField from "../widgets/ValidatedField";
import { VALIDATORS_BY_NAME } from "../../constants";

const styles = theme => ({
  ...commonStyles,
  root: {
    display: "flex",
    flexGrow: 1,
    marginTop: pixels.gobalSpacing,
    flexDirection: "column",
    paddingBottom: "16px"
  },
  rte: {
    borderBottom: "solid 1px #9e9e9e",
    "&:hover": {
      borderBottom: "solid 2px #000000"
    }
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

const initialPledge = {
  title: "",
  cost: "Low",
  ordinal: 1
};

const emptyDescRt = {
  blocks: [
    {
      key: "dgc6i",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
};

const costOptions = [{ name: "Low" }, { name: "Medium" }, { name: "High" }];

class EditPledge extends Component {
  constructor(props) {
    super(props);
    this.rteRef = React.createRef();
    const { match } = this.props;
    const { pledgeId } = match.params;
    const initialState = { ...initialPledge };
    if (isNew(pledgeId)) initialState.descRt = emptyDescRt;
    this.state = initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.haveSetPledgeFB) return;
    const { pledgeFB } = nextProps;
    if (pledgeFB) {
      this.setState({
        ...pledgeFB,
        haveSetPledgeFB: true
      });
    }
  }

  // TODO
  handleConfirmDelete = () => {
    this.handleDelete();
  };
  handleDelete = () => {
    const { onDeletePledge, match } = this.props;
    const { pledgeId } = match.params;
    onDeletePledge(pledgeId);
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push(`/${paths.pledges}`);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // As there is no onChange api for the mui-rte
  // we need to first activate its save method to get the updated data
  // The method called by the save, gets the data, so we can set the state from it
  // Only when the state has been updated, can we save the pledge itself
  // so use the setState callback to do this
  // 1. activate save method on mui-rte
  // 2. update the descRt value in state using the rte's data
  // 3. wait for the state to be set
  // 4. use the state to add/update the pledge
  handleSaveWrapper = () => {
    if (!this.rteRef.current) {
      // If no rte, bypass to final save
      this.handleSave();
      return;
    }
    // Activates the rte's save function
    this.rteRef.current.save();
  };
  // The rte's save function
  rteSave = data => {
    this.setState(
      {
        descRt: JSON.parse(data)
      },
      this.handleSave
    );
  };
  // The final save which actually adds/updates the pledge
  handleSave = () => {
    const { onAddPledge, onUpdatePledge, match } = this.props;
    const { title, descRt, ordinal, cost } = this.state;
    const { pledgeId } = match.params;

    // Construct the pledge
    const pledge = {
      title,
      ordinal: Number(ordinal),
      cost
    };
    if (!isNew(pledgeId)) pledge.id = pledgeId;
    if (descRt) pledge.descRt = descRt;

    if (!isNew(pledgeId)) {
      // If it doesn't have a new id, update it
      onUpdatePledge(pledge);
    } else {
      // Add it if it has the new id
      onAddPledge(pledge);
    }
  };

  render() {
    const { classes } = this.props;
    const { title, descRt, ordinal, cost } = this.state;
    const commonProps = {
      inputProps: { className: classes.textFieldContainer },
      onChange: this.handleChange,
      className: classes.textField,
      fullWidth: true
    };
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid item xs={6}>
            <ValidatedField
              id="title"
              name="title"
              label="Title"
              value={title}
              validators={[VALIDATORS_BY_NAME.REQUIRED]}
              {...commonProps}
            />
          </Grid>
          <Grid item xs={3}>
            <ValidatedField
              id="ordinal"
              name="ordinal"
              label="Ordinal"
              value={ordinal}
              validators={[VALIDATORS_BY_NAME.NUMBER]}
              {...commonProps}
            />
          </Grid>
          <Grid item xs={3}>
            <ValidatedField
              type="select"
              label="Cost"
              id="cost"
              name="cost"
              values={costOptions}
              value={cost}
              onChange={this.handleChange}
              optionName="name"
              optionValue="name"
              validators={[VALIDATORS_BY_NAME.REQUIRED]}
            />
          </Grid>
          {descRt && (
            <Grid item xs={12}>
              <div className={classes.rte}>
                <MUIRichTextEditor
                  ref={this.rteRef}
                  onSave={this.rteSave}
                  label="Description..."
                  value={JSON.stringify(descRt)}
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
              </div>
            </Grid>
          )}
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.handleSaveWrapper}
            >
              Save
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

EditPledge.defaultProps = {
  claims: {}
};

EditPledge.propTypes = {
  claims: PropTypes.object.isRequired,
  pledgeFB: PropTypes.object,
  onAddPledge: PropTypes.func.isRequired,
  onUpdatePledge: PropTypes.func.isRequired,
  onDeletePledge: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    claims: state.login.claims,
    pledgeFB: state.firestore.data.pledge
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPledge: pledge => dispatch(addPledge(pledge)),
    onUpdatePledge: pledge => dispatch(updatePledge(pledge)),
    onDeletePledge: pledge => dispatch(deletePledge(pledge))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    const { match } = props;
    const { pledgeId } = match.params;
    const queriesToMake = [];
    if (!isNew(pledgeId)) {
      queriesToMake.push(queries.getPledge(pledgeId));
    }
    return queriesToMake;
  }),
  withStyles(styles)
)(EditPledge);
