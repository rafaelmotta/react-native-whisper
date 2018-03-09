import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import theme from './config/theme'

class Whisper extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    duration: PropTypes.number, // TODO
    onComplete: PropTypes.func,// TODO
    onClose: PropTypes.func,  // TODO
    onPress: PropTypes.func,
    theme: PropTypes.oneOf([ // TODO
      'success',
      'info',
      'danger',
      'warning'
    ]),
    containerStyle: PropTypes.shape({}),
    textStyle: PropTypes.shape({}),
  }

  static defaultProps = {
    containerStyle: {},
    textStyle: {}
  }

  render () {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress}>
          <View
            style={[
              styles.container,
              this.props.containerStyle
            ]}
          >
            {typeof this.props.children === 'string' &&
              <React.Fragment>
                <Text
                  style={[
                    styles.text,
                    this.props.textStyle
                  ]}
                >
                  {this.props.children}
                </Text>
              </React.Fragment>
            }
            {typeof this.props.children === 'object' &&
              <React.Fragment>
                {this.props.children}
              </React.Fragment>
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.defaulBackgroundColor,
    height: theme.statusBarHeight,
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    color: theme.defaultColor,
    fontSize: theme.smallFontSize
  }
})

export default Whisper
