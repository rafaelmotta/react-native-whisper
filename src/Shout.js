import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet
} from 'react-native'

class Shout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: PropTypes.string,
    duration: PropTypes.number,
    onComplete: PropTypes.func,
    onClose: PropTypes.func,
    onPress: PropTypes.func
  }

  static defaultProps = {
    duration: 3000
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

export default Shout
