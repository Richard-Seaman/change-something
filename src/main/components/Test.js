import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { setTitle } from "../store/actions/NavActions";

import MUIRichTextEditor from "mui-rte";

const styles = theme => {
  return {};
};

class Test extends Component {
  componentDidMount() {
    const { onSetTitle } = this.props;
    onSetTitle("Test");
  }
  render() {
    return (
      <div>
        <MUIRichTextEditor
          onSave={data => console.log(JSON.stringify(data))}
          label="Description..."
          value={""}
          controls={[
            "bold",
            "italic",
            "underline",
            "link",
            "numberList",
            "bulletList",
            "quote",
            "code",
            "save"
          ]}
        />
      </div>
    );
  }
}

Test.propTypes = {
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
)(Test);
