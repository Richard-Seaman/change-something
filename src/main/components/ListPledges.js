import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

class ListPledges extends Component {

  render() {
    return (
      <Fragment>
        Pledge
      </Fragment>
    )
  }
}

ListPledges.propTypes = {
}

const mapStateToProps = state => {
}
  
const mapDispatchToProps = {
}
  
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ListPledges)