import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { titles } from "../../navigation/navItems";
import { setTitle } from "../../store/actions/NavActions";
import { typoProps } from "../../constants";
import { commonStyles } from "../../styles";

const styles = theme => {
  return {
    ...commonStyles
  };
};

class Home extends Component {
  state = {
    tabIndex: 0
  };

  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle(titles.home);
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  renderIntroduction() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          The <i>“change something”</i> movement is a campaign designed to
          encourage and support individuals and households in Ireland to commit
          to changing something by 2020 that reduces their energy usage and
          associated environmental impact.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Europe has made commitments to reduce its energy usage by 2020 and is
          currently failing to achieve its own target. Likewise, Ireland is not
          currently on target to meet its commitments. One response is to blame
          those responsible for policy but this campaign is designed to take
          matters into our own hands by making a change at an individual level.
          Making real changes in our impact has a direct reduction in energy
          usage but also sends a strong message to policy makers that we
          understand and support the implications of change.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          It is easy to get caught up in arguments about what changes have what
          impact and this movement skips the talk and goes straight to
          <i>“change something”</i>. Everyone has the potential to make a change
          irrespective of their financial means and in many cases making changes
          also results in cost savings. This campaign encourages everyone to
          select changes that match their means.
        </Typography>
      </div>
    );
  }

  renderHowThisWorks() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          Potential changes are listed roughly by cost. The cost of some changes
          will depend on your circumstances. For example: if you have a
          five-year-old washing machine it is easier to change it with an
          <i>“A”</i> rated appliance than if you bought a <i>“B”</i> rated one
          last year.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Look at the collection of suggested changes and click on one to commit
          to undertaking it. It is important to only select items that you are
          not currently doing as the purpose is to change something by 2020. You
          will be asked to log on using a Facebook or Google account. This is
          purely to make sure people rather than robots are making commitments!
          If you don’t have an account you can easily sign up for one with one
          of those companies.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Where a change is ongoing it is important to set a target. For
          example, if you commit to cycling to work then set yourself a
          meaningful target such as
          <i>“On average I will cycle one time in five for 2020”</i>. Suggested
          frequencies are provided for some items but the point is not to adhere
          rigidly to the suggestion but to change something!
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          If you think of a good change that is not on our list, just drop us an
          email and we will try to add it to the list if it is useful for
          others.
        </Typography>
      </div>
    );
  }

  renderJoin() {
    const { classes, history } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          Everyone is welcome to join this campaign. Simply by making a
          commitment to change something and by telling others about the site,
          you are part of the movement.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Please distribute links to this site on your social media and add
          forums to spread change.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          We are always looking for assistance so if you would like to help
          please feel free to get in touch.
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          If you have suggestions of items to be added to the potential list of
          changes or objections to any of the existing items included please let
          us know. If objecting to the inclusion of an item it is useful to
          provide backup information such as calculations and sources.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => history.push("/contact")}
        >
          Contact Us
        </Button>
      </div>
    );
  }

  renderPrinciples() {
    const { classes } = this.props;
    return (
      <div className={classes.contentContainer}>
        <Typography {...typoProps.para} className={classes.para}>
          The goal of this campaign is it encourage real changes that reduce
          energy use. To replace talk with action and to actually
          <i>“change something”</i>. There are several principles that should be
          followed when discussing the campaign:
        </Typography>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Global Warming
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Detailed debate about global warming is not beneficial for our
          purposes. Our message is simply <i>“change something”</i>. Some people
          may want to make changes due to concerns of resource depletion,
          pollution impacts or a desire to reduce global warming. Others may
          simply want to reduce their bills. Everyone is welcome irrespective of
          the detail of their belief – stop arguing and just
          <i>“change something”</i>
        </Typography>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Materials and Pollution
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          There are many environmental impacts that can be reduced by changing
          something. This campaign could easily and justifiably include measures
          that reduce material consumption, recycling, local pollution etc. Our
          intention is to keep things as simple as possible and cover only items
          that reduce energy consumption. In many cases there will be associated
          reductions in carbon emissions, material waste, pollution etc.
        </Typography>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Change Ranking
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The campaign intently avoids the complexity of ranking measures by
          impact, measuring the impact of each change etc. Detail is important
          and is readily available elsewhere. Detail can however distract from
          making changes and our message is: Stop debating for a minute and
          change something. Once you have made a real change personally, you can
          get back to the debate.
        </Typography>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Embodied Energy
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          Embodied energy is often used as an excuse not to make change. The
          argument made is that the energy used to produce a solar panel, car
          etc. “could” be more than that saved. In most cases the energy of
          production is promptly recovered by the energy savings made. There are
          some exceptions and the result is dependent on usage. For example, if
          you purchase an electric car and only use it for a 2km journey each
          day then the impact is negative. Being able to find an exception to
          the rule does not make the technology negative. If the overall impact
          of the technology is positive then it should be promoted. Don’t get
          distracted with obscure exceptions.
        </Typography>
        <Typography {...typoProps.subTitle} className={classes.subTitle}>
          Promotion of Manufacturers
        </Typography>
        <Typography {...typoProps.para} className={classes.para}>
          The campaign will make every effort to avoid promoting any particular
          manufacturer over another. In some cases, it may be beneficial to
          refer to a particular product. We do not accept any payment for
          referring to a particular manufacturer and will address the issue
          where we are informed of equivalent alternatives.
        </Typography>
      </div>
    );
  }

  render() {
    const { classes, history } = this.props;
    const { tabIndex } = this.state;
    return (
      <div className={classes.mainPageRoot}>
        <div className={classes.featureImageContainer}>
          <img
            className={classes.featureImage}
            src="/images/background-min.jpg"
            alt="Irish Countryside"
          />
          <div className={classes.imageOverlayContainer}>
            <Typography {...typoProps.imageTextOverlay}>
              STOP DEBATING, START ACTING
            </Typography>
          </div>
        </div>
        <div className={classes.actionButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/pledges")}
          >
            I'm ready to Change Something
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => history.push("/campaign")}
          >
            Renewable Energy Campaign
          </Button>
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
            <Tab label="JOIN" />
            <Tab label="PRINCIPLES" />
          </Tabs>
        </div>
        {tabIndex === 0 && this.renderIntroduction()}
        {tabIndex === 1 && this.renderHowThisWorks()}
        {tabIndex === 2 && this.renderJoin()}
        {tabIndex === 3 && this.renderPrinciples()}
      </div>
    );
  }
}

Home.propTypes = {
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
)(Home);
