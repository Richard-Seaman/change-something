import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";
import { typoProps } from "../../constants";
import { commonStyles } from "../../styles";
import PayPal from "../widgets/PayPal";

const styles = theme => {
  return {
    ...commonStyles,
    root: {
      paddingBottom: "32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    contentContainer: {
      maxWidth: "1500px",
      margin: "0 16px",
      padding: "0 16px"
    },
    button: {
      margin: "16px auto"
    },
    featureImageContainer: {
      height: "400px",
      width: "100%",
      position: "relative"
    },
    featureImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    imageOverlayContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      display: "flex",
      flexDirection: "column"
    },
    actionButtonContainer: {
      marginTop: "16px"
    },
    tabsContainer: {
      margin: "0 16px"
    }
  };
};

class Campaign extends Component {
  state = {
    tabIndex: 0
  };

  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.campaign);
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  renderIntroduction() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          Ireland has a target of achieving 16% of its energy generation from
          renewable sources by 2020. Within this target Ireland has an intent to
          produce 42.5% of its electricity from renewable sources by 2020. The
          transfer of electricity to renewable energy is particularly important
          because many other forms of energy consumption that currently rely on
          fossil fuels (such as heating and transport) are turning to
          electricity.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          A renewable energy revolution is underway in Ireland. There has been
          reasonable progress in developing wind energy (with it providing
          roughly 30% of our electrical energy demand) but progress on solar
          energy has been slow.{" "}
          <b>The solar revolution is only just beginning.</b>
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Almost all new buildings must contain solar panels but they typically
          provide less than 10% of each building’s real energy usage.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          While many of us want to move the solar revolution forward at a faster
          pace, we can't all afford to buy solar panels for our homes or we do
          not own a suitable building to install solar panels.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          This Renewable Energy Campaign is designed to provide a platform for
          us to work together to drive the solar revolution forwards at a low
          individual cost. Let’s not wait for prices to reduce or grants to
          improve or for the government to invest in large solar schemes, let’s
          <b>
            <i>change something</i>
          </b>{" "}
          now!
        </Typography>
      </div>
    );
  }

  renderHowThisWorks() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          You can imagine this project as being a crowd funded renewable energy
          project but unlike a crowd funded project there is no single
          individual benefiting from the project.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          This project can also be imagined as a renewable energy lottery game
          where every cent invested goes directly towards renewable energy.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          It costs as little as €2 each time you play and when the total fund is
          large enough, someone will randomly be selected to receive assistance
          with a PV (electric solar panel) installation. If you do not want to
          install PV or don't have a suitable house then you can nominate
          someone else or a school or community project to receive the PV in the
          event that your name is selected.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Because all of the money invested goes directly towards PV, you win
          even if you lose.
        </Typography>
      </div>
    );
  }

  renderTermsAndConditions() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          100% of the funds provided are used for renewable energy projects.
          There is no management fee and the scheme is administered by our
          members on a voluntary basis. The financial companies that process
          payments do take a small cut and this is currently unavoidable.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The scheme’s administrators are excluded from benefiting from the
          scheme. They may contribute but cannot be selected to receive any
          benefit. The scheme will be independently audited to ensure it's fair
          administration.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Funds will only be paid directly to renewable energy installers in
          order to ensure that all funds are used for purpose. The person or
          organisation nominated to receive funding will select their installer.
          Feedback on prices and quality on completion will be gathered and made
          available to future nominated individuals.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The assistance provided for the installation of renewable energy will
          not necessarily cover the full cost of the installation but will
          reduce the cost to the point that it is of clear financial benefit to
          the person receiving the support. The person receiving the funding
          will also be able to avail of any grants available from SEAI for the
          installation. Should the person nominated not wish to proceed within a
          four month period they must nominate another person or an alternative
          person will be appointed.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The payment of tax on amounts received will be the responsibility of
          the person receiving the funding.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          While it is expected that the funds will in most cases be used to
          invest in solar photovoltaic panels, other forms of renewable energy
          will be acceptable. Alternative renewable energy sources will only be
          accepted if they have a similar environmental benefit per investment
          cost and it is shown that they don’t produce direct local pollution.
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { tabIndex } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.featureImageContainer}>
          <img
            className={classes.featureImage}
            src="/images/pv-min.jpg"
            alt="Irish Countryside"
          />
          <div className={classes.imageOverlayContainer}>
            <Typography {...typoProps.imageTextOverlay}>
              100% CONTRIBUTION TO RENEWABLES
            </Typography>
          </div>
        </div>
        <div className={classes.actionButtonContainer}>
          <PayPal></PayPal>
        </div>
        <div className={classes.tabsContainer}>
          <Tabs
            value={tabIndex}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            <Tab label="INTRODUCTION" />
            <Tab label="HOW THIS WORKS" />
            <Tab label="TERMS & CONDITIONS" />
          </Tabs>
        </div>
        {tabIndex === 0 && this.renderIntroduction()}
        {tabIndex === 1 && this.renderHowThisWorks()}
        {tabIndex === 2 && this.renderTermsAndConditions()}
      </div>
    );
  }
}

Campaign.propTypes = {
  onSetTitle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTitle: title => dispatch(setTitle(title))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Campaign);
