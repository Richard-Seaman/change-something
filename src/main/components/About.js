import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

class About extends Component {

  render() {
    return (
      <Fragment>
        Hello
      </Fragment>
    )
  }
}

About.propTypes = {
}

const mapStateToProps = state => {
}
  
const mapDispatchToProps = {
}
  
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(About)