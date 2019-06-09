import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { firestoreConnect } from "react-redux-firebase";
import { collections, storedAs } from "../../store/firebaseConfig";
import PledgeItem from "./PledgeItem";

import { pixels } from "../../constants";
import {
  addCommitment,
  deleteCommitment
} from "../../store/actions/PledgeActions";
import { showLogin } from "../../store/actions/LoginActions";

const styles = theme => {
  return {
    root: {
      display: "flex",
      flexGrow: 1,
      marginTop: pixels.gobalSpacing
    },
    paper: {
      padding: "8px",
      textAlign: "left"
    }
  };
};

class ListPledges extends Component {
  handleAddCommitment = pledgeId => {
    const { onAddCommitment, uid, onShowLogin } = this.props;
    if (!uid) {
      onShowLogin();
    } else onAddCommitment(pledgeId);
  };

  handleDeleteCommitment = commitment => {
    const { onDeleteCommitment, uid, onShowLogin } = this.props;
    if (!uid) {
      onShowLogin();
    } else onDeleteCommitment(commitment);
  };

  renderPledgeItems() {
    const {
      [storedAs.allPledges]: pledges,
      [storedAs.myCommitments]: myCommitments,
      uid
    } = this.props;
    const sortedPledges = [...pledges].sort((a, b) =>
      a.ordinal < b.ordinal ? -1 : a.ordinal > b.ordinal ? 1 : 0
    );
    return sortedPledges.map(pledge => {
      return (
        <Grid item xs={12} sm={6} lg={4} key={pledge.id}>
          <PledgeItem
            pledge={pledge}
            commitment={myCommitments.find(
              c => c.userId === uid && c.pledgeId === pledge.id
            )}
            onAddCommitment={this.handleAddCommitment}
            onDeleteCommitment={this.handleDeleteCommitment}
          />
        </Grid>
      );
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          {this.renderPledgeItems()}
        </Grid>
      </div>
    );
  }
}

ListPledges.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.object,
  [storedAs.allPledges]: PropTypes.array,
  [storedAs.myCommitments]: PropTypes.array,
  onAddCommitment: PropTypes.func.isRequired,
  onDeleteCommitment: PropTypes.func.isRequired,
  onShowLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.pledges.checked || {},
    uid: state.firebase.auth.uid,
    [storedAs.allPledges]: state.firestore.ordered[storedAs.allPledges] || [],
    [storedAs.myCommitments]:
      state.firestore.ordered[storedAs.myCommitments] || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCommitment: pledgeId => dispatch(addCommitment(pledgeId)),
    onDeleteCommitment: commitment => dispatch(deleteCommitment(commitment)),
    onShowLogin: () => dispatch(showLogin())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  firestoreConnect(props => {
    const { uid } = props;
    const queries = [];
    queries.push({
      collection: collections.PLEDGES,
      storeAs: storedAs.allPledges
    });
    if (uid) {
      queries.push({
        collection: collections.COMMITMENTS,
        where: [["userId", "==", uid]],
        storeAs: storedAs.myCommitments
      });
    }
    return queries;
  })
)(ListPledges);
