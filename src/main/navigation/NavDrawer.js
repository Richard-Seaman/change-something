import React, { Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { hideNavDrawer } from "../store/actions/NavActions";
import { items } from "./navItems";

const styles = theme => ({
  list: {
    width: 250
  }
});

class NavDrawer extends React.Component {
  handleHideDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    const { onHideNavDrawer } = this.props;
    onHideNavDrawer();
  };

  handleSelected = item => {
    const { history } = this.props;
    history.push(item.link);
  };

  getList = () => {
    const { classes, currentTitle, claims } = this.props;
    const topListItems = items.filter(
      item => item.section === 0 && !item.admin
    );
    const bottomListItems = items.filter(
      item => item.section === 1 && !item.admin
    );
    const adminListItems = items.filter(item => !!item.admin);
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.handleHideDrawer()}
        onKeyDown={this.handleHideDrawer()}
      >
        <List component="nav">
          {topListItems.map(item => (
            <ListItem
              button
              key={item.title}
              selected={item.title === currentTitle}
              onClick={() => this.handleSelected(item)}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List component="nav">
          {bottomListItems.map(item => (
            <ListItem
              button
              key={item.title}
              selected={item.title === currentTitle}
              onClick={() => this.handleSelected(item)}
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        {claims.moderator && adminListItems.length > 0 && (
          <Fragment>
            <Divider />
            <List component="nav">
              {adminListItems.map(item => (
                <ListItem
                  button
                  key={item.title}
                  selected={item.title === currentTitle}
                  onClick={() => this.handleSelected(item)}
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Fragment>
        )}
      </div>
    );
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Drawer open={isOpen} onClose={this.handleHideDrawer()}>
        {this.getList()}
      </Drawer>
    );
  }
}

NavDrawer.defaultProps = {
  claims: {}
};

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onHideNavDrawer: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  claims: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isOpen: state.nav.isOpen,
    currentTitle: state.nav.title,
    claims: state.login.claims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHideNavDrawer: () => dispatch(hideNavDrawer())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(NavDrawer);
