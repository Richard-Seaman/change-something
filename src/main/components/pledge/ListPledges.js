import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { firestoreConnect } from "react-redux-firebase";
import { collections, storedAs } from "../../store/firebaseConfig";
import PledgeItem from "./PledgeItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { pixels } from "../../constants";
import { paths } from "../../routes/constants";
import {
  addCommitment,
  deleteCommitment
} from "../../store/actions/PledgeActions";
import { showLogin } from "../../store/actions/LoginActions";
import { setTitle } from "../../store/actions/NavActions";
import { titles } from "../../navigation/navItems";
import { commonStyles } from "../../styles";

const styles = theme => {
  return {
    ...commonStyles,
    root: {
      display: "flex",
      flexGrow: 1,
      marginTop: pixels.gobalSpacing,
      flexDirection: "column",
      paddingBottom: "16px"
    },
    paper: {
      padding: "8px",
      textAlign: "left"
    },
    costTitle: {
      fontSize: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: "16px",
      marginBottom: "8px"
    },
    costContainer: {
      width: "100%"
    },
    adminContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%"
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    }
  };
};

class ListPledges extends Component {
  state = {
    deleteDialogOpen: false,
    commitment: null
  };

  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.pledges);
  }

  handleAddCommitment = pledgeId => {
    const { onAddCommitment, uid, onShowLogin } = this.props;
    if (!uid) {
      onShowLogin();
    } else onAddCommitment(pledgeId);
  };

  handleShowDeleteCommitment = commitment => {
    this.setState({ deleteDialogOpen: true, commitment });
  };

  handleHideDeleteCommitment = () => {
    this.setState({ deleteDialogOpen: false, commitment: null });
  };

  handleDeleteCommitment = commitment => {
    this.handleHideDeleteCommitment();
    const { onDeleteCommitment, uid, onShowLogin } = this.props;
    if (!uid) {
      onShowLogin();
    } else onDeleteCommitment(commitment);
  };

  handleAddNewPledge = () => {
    const { history } = this.props;
    history.push(`/${paths.pledges}/${paths.new}`);
  };

  renderLoading() {
    const { classes } = this.props;
    return (
      <div className={classes.loadingContainer}>
        <Typography>Pledges loading, please wait...</Typography>
        <LinearProgress />
      </div>
    );
  }

  renderPledgeItems(cost) {
    const {
      [storedAs.ALL_PLEDGES]: pledges,
      [storedAs.MY_COMMITMENTS]: myCommitments,
      uid,
      history
    } = this.props;
    const sortedPledges = [...pledges]
      .filter(p => p.cost === cost)
      .sort((a, b) =>
        a.ordinal < b.ordinal ? -1 : a.ordinal > b.ordinal ? 1 : 0
      );
    if (sortedPledges.length === 0) return this.renderLoading();
    return sortedPledges.map(pledge => {
      return (
        <PledgeItem
          key={pledge.id}
          pledge={pledge}
          commitment={myCommitments.find(
            c => c.userId === uid && c.pledgeId === pledge.id
          )}
          onAddCommitment={this.handleAddCommitment}
          onDeleteCommitment={this.handleShowDeleteCommitment}
          history={history}
        />
      );
    });
  }

  render() {
    const { classes, claims } = this.props;
    const { deleteDialogOpen, commitment } = this.state;
    const costs = ["Low", "Medium", "High"];
    return (
      <div className={classes.root}>
        <Grid container spacing={2}>
          {claims.moderator && (
            <div className={classes.adminContainer}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.handleAddNewPledge}
              >
                {"New"}
              </Button>
            </div>
          )}
          {costs.map(cost => {
            return (
              <div key={cost} className={classes.costContainer}>
                <Typography className={classes.costTitle}>
                  {cost} Cost
                </Typography>
                {this.renderPledgeItems(cost)}
              </div>
            );
          })}

          <Dialog
            open={deleteDialogOpen}
            onClose={this.handleHideDeleteCommitment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to go back on your word and break your
                commitment to help save the world?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.handleDeleteCommitment(commitment)}
                color="secondary"
              >
                Revoke
              </Button>
              <Button
                onClick={this.handleHideDeleteCommitment}
                color="primary"
                autoFocus
              >
                Nevermind
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    );
  }
}

ListPledges.defaultProps = {
  claims: {}
};

ListPledges.propTypes = {
  claims: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  [storedAs.ALL_PLEDGES]: PropTypes.array,
  [storedAs.MY_COMMITMENTS]: PropTypes.array,
  onAddCommitment: PropTypes.func.isRequired,
  onDeleteCommitment: PropTypes.func.isRequired,
  onShowLogin: PropTypes.func.isRequired,
  onSetTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    [storedAs.ALL_PLEDGES]: state.firestore.ordered[storedAs.ALL_PLEDGES] || [],
    [storedAs.MY_COMMITMENTS]:
      state.firestore.ordered[storedAs.MY_COMMITMENTS] || [],
    claims: state.login.claims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCommitment: pledgeId => dispatch(addCommitment(pledgeId)),
    onDeleteCommitment: commitment => dispatch(deleteCommitment(commitment)),
    onShowLogin: () => dispatch(showLogin()),
    onSetTitle: title => dispatch(setTitle(title))
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
      storeAs: storedAs.ALL_PLEDGES
    });
    if (uid) {
      queries.push({
        collection: collections.COMMITMENTS,
        where: [["userId", "==", uid]],
        storeAs: storedAs.MY_COMMITMENTS
      });
    }
    return queries;
  })
)(ListPledges);
