import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import renderRoutes from '../routes/renderRoutes';
import pageRoutes from '../routes/pageRoutes';
import TopAppBar from '../navigation/TopAppBar';

const styles = () => ({

})

class BaseLayout extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.baseLayoutContainer}>
                <TopAppBar></TopAppBar>
                <Switch>{renderRoutes(pageRoutes)}</Switch>
            </div>
        )
    }
}

BaseLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(styles),
    withRouter
)(BaseLayout);