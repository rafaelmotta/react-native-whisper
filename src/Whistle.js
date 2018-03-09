import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet
} from 'react-native'

class Whistle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onComplete: PropTypes.func,
    onClose: PropTypes.func,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    color: PropTypes.string
  }

  render () {
    return (
      <View style={styles.container}></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  }
})

export default Whistle
