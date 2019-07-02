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
import { setFormData } from "../../store/actions/FormActions";
import { commonStyles } from "../../styles";
import { storedAs, queries } from "../../store/firebaseConfig";
import { isNew, paths } from "../../routes/constants";

const styles = theme => ({
  ...commonStyles,
  editor: {
    background: "white"
  }
});

class EditPledge extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    // TODO: set fields if existing pledge
  }

  handleSave = () => {
    // TODO
    const {
      [storedAs.PLEDGE]: pledge,
      onAddPledge,
      onUpdatePledge,
      match
    } = this.props;
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

  handleTextFieldChange = (event, fieldKey) => {
    const { onSetFormData } = this.props;
    onSetFormData("pledge", fieldKey, event.target.value);
    // TODO
  };

  handleConfirmDelete = () => {
    this.handleDelete();
  };

  handleSaveText = data => {
    console.log(data);
  };

  render() {
    const { classes, [storedAs.PLEDGE]: pledge, match, formData } = this.props;
    const { pledgeId } = match.params;
    return (
      <div className={`${classes.viewPage} ${classes.topBorder}`}>
        <Grid container spacing={24} direction="row" justify="center">
          <Grid item xs={12}>
            <TextField
              fullWidth={true}
              //error={!config.valid && config.touched}
              id={"title"}
              label={"Title"}
              //helperText={config.error || config.helperText || null}
              className={classes.textField}
              value={formData.title || ""}
              onChange={event => this.handleTextFieldChange(event, "title")}
              margin="normal"
            />
          </Grid>
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
  pledge: PropTypes.object,
  formData: PropTypes.object.isRequired,
  onAddPledge: PropTypes.func.isRequired,
  onUpdatePledge: PropTypes.func.isRequired,
  onDeletePledge: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    claims: state.login.claims,
    pledge: state.firestore.data.pledge,
    formData: state.forms.pledge
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
