import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { firestoreConnect } from "react-redux-firebase";
import { collections } from "../../store/firebaseConfig";
import PledgeItem from "./PledgeItem";

import { togglePledge } from "../../store/actions/pledges";
import { pixels } from "../../constants";

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
  handlePledgeCheck = event => {
    const { onTogglePledge } = this.props;
    onTogglePledge(event.target.value);
  };

  renderPledgeItems() {
    const { pledgesFB, checked } = this.props;
    return pledgesFB.map(pledge => {
      return (
        <Grid item xs={6} key={pledge.id}>
          <PledgeItem
            pledge={pledge}
            isChecked={checked[pledge.id] || false}
            onChecked={this.handlePledgeCheck}
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
  pledgesFB: PropTypes.array
};

const mapStateToProps = state => {
  return {
    checked: state.pledges.checked || {},
    pledgesFB: state.firestore.ordered.pledges || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTogglePledge: pledgeId => dispatch(togglePledge(pledgeId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  firestoreConnect(props => {
    return [
      {
        collection: collections.PLEDGES
      }
    ];
  })
)(ListPledges);
