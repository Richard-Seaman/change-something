import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MUIRichTextEditor from "mui-rte";

import {
  addPledge,
  updatePledge,
  deletePledge
} from "../../store/actions/PledgeActions";
import { commonStyles } from "../../styles";
import { storedAs, queries } from "../../store/firebaseConfig";
import { isNew, paths } from "../../routes/constants";

import ValidatedField from "../widgets/ValidatedField";
import { VALIDATORS_BY_NAME } from "../../constants";

const styles = theme => ({
  ...commonStyles,
  rte: {
    borderBottom: "solid 1px #9e9e9e",
    "&:hover": {
      borderBottom: "solid 2px #000000"
    }
  }
});

const initialPledge = {
  title: "",
  descRt: "",
  cost: "High",
  ordinal: 99
};

class EditPledge extends Component {
  constructor(props) {
    super(props);
    this.rteRef = React.createRef();
  }

  state = {};

  componentWillReceiveProps(nextProps) {
    // TODO: set fields if existing pledge
    if (this.state.haveSetPledgeFB) return;
    const { pledgeFB } = nextProps;
    if (pledgeFB) {
      if (!pledgeFB.descRt) {
        pledgeFB.descRt = "";
      }
      this.setState({
        ...pledgeFB,
        haveSetPledgeFB: true
      });
    } else if (!this.state.haveSetPledgeInitial) {
      this.setState({
        ...initialPledge,
        haveSetPledgeInitial: true
      });
    }
  }

  handleSave = () => {
    // TODO
    const { onAddPledge, onUpdatePledge, match } = this.props;
    const { title, descRt, ordinal, cost } = this.state;
    const { pledgeId } = match.params;
    if (!isNew(pledgeId)) {
      //onUpdateProvider();
    } else {
      //onAddProvider();
    }
  };

  handleDelete = () => {
    const { onDeleteProvider, match } = this.props;
    const { pledgeId } = match.params;
    onDeleteProvider(pledgeId);
  };

  handleCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleConfirmDelete = () => {
    this.handleDelete();
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log("name: ", name, " value: ", value);
    this.setState({
      [name]: value
    });
    this.setDescRtState();
  };

  setDescRtState = () => {
    this.rteRef.current.save();
  };

  handleRteData = data => {
    console.log(data);
    this.setState({
      descRt: JSON.parse(data)
    });
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
      <div className={`${classes.viewPage} ${classes.topBorder}`}>
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
              id="cost"
              name="cost"
              label="Cost"
              value={cost}
              validators={[VALIDATORS_BY_NAME.REQUIRED]}
              {...commonProps}
            />
          </Grid>
          {descRt && (
            <Grid item xs={12}>
              <div className={classes.rte}>
                <MUIRichTextEditor
                  ref={this.rteRef}
                  onSave={this.handleRteData}
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
  onDeletePledge: PropTypes.func.isRequired
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
