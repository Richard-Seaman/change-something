import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import { firestoreConnect } from 'react-redux-firebase';
import { collections } from '../../store/firebaseConfig';
import Typography from '@material-ui/core/Typography';

import { togglePledge } from '../../store/actions/pledges';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '8px',
    textAlign: 'left'
  },
});

class ListPledges extends Component {

  handlePledgeCheck = (event) => {
    const { onTogglePledge } = this.props;
    onTogglePledge(event.target.value);
  }

  renderPledges() {
    const { pledgesFB, classes, checked } = this.props;
    console.log('pledgesFB: ', pledgesFB);
    return (
      pledgesFB.map(pledge => {
        return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {pledge.title && <Typography variant="h6" className={classes.title}>{pledge.title}</Typography>}
            {pledge.desc && <Typography variant="body2">{pledge.desc}</Typography>}
            <Checkbox checked={checked[pledge.id] || false} onChange={this.handlePledgeCheck} value={pledge.id} />
          </Paper>
        </Grid>
        )
      })
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={3}>
        {this.renderPledges()}
      </Grid>
    </div>
    )
  }
}

ListPledges.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.object,
  pledgesFB: PropTypes.array,
}

const mapStateToProps = state => {
  return {
    checked: state.pledges.checked || {},
    pledgesFB: state.firestore.ordered.pledges || [],
  };
};
  
const mapDispatchToProps = dispatch =>  {
  return {
    onTogglePledge: pledgeId => dispatch(togglePledge(pledgeId))
  }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    firestoreConnect(props => {
      return [
        {
          collection: collections.PLEDGES
        }
      ];
    }),
)(ListPledges)