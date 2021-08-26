import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import SearchPage from './SearchPage';

class Search extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: this.props.themeColors.backGroundColor }} >
        <SearchPage navigate={this.props.navigate} />
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
    themeColors: state.root.themeColors,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
