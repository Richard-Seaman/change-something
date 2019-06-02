import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginDialog from '../components/auth/LoginDialog';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: '8px',
    },
    title: {
      flexGrow: 1,
    },
  });


class TopAppBar extends React.Component {

    state = {
        open: false
    }

    handleCloseLogin = () => {
        this.setState({open:false})
    }

    handleOpenLogin = () => {
        this.setState({open:true})
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Change Something
                </Typography>
                <IconButton
                    aria-haspopup="true"
                    onClick={this.handleOpenLogin}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
              </Toolbar>
            </AppBar>
            <LoginDialog open={open} handleClose={this.handleCloseLogin}></LoginDialog>
          </div>
        );
    }

}

const mapStateToProps = state => {
    return {  }
  }
  
  const mapDispatchToProps = {
  }
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
  )(TopAppBar);