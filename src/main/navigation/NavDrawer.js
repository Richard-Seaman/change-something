import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { showNavDrawer, hideNavDrawer } from "../store/actions/NavActions";

const styles = theme => ({
  list: {
    width: 250
  }
});

class NavDrawer extends React.Component {
  handleToggleDrawer = isOpen => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    const { onHideNavDrawer, onShowNavDrawer } = this.props;
    if (isOpen) {
      onShowNavDrawer();
    } else {
      onHideNavDrawer();
    }
  };

  getList = () => {
    const { classes } = this.props;
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.handleToggleDrawer(false)}
        onKeyDown={this.handleToggleDrawer(false)}
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Drawer open={isOpen} onClose={this.handleToggleDrawer(false)}>
        {this.getList()}
      </Drawer>
    );
  }
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onShowNavDrawer: PropTypes.func.isRequired,
  onHideNavDrawer: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isOpen: state.nav.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShowNavDrawer: () => dispatch(showNavDrawer()),
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
