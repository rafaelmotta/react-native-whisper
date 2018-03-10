import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Text,
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
    onPress: PropTypes.func,
    theme: PropTypes.oneOf([
      'success',
      'info',
      'danger',
      'warning'
    ]),
    containerStyle: PropTypes.shape({}),
    textStyle: PropTypes.shape({})
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
              this.props.theme === 'success' && styles.successContainer,
              this.props.theme === 'info' && styles.infoContainer,
              this.props.theme === 'danger' && styles.dangerContainer,
              this.props.theme === 'warning' && styles.warningContainer,
              this.props.containerStyle
            ]}
          >
            {typeof this.props.children === 'string' &&
              <React.Fragment>
                <Text
                  style={[
                    styles.text,
                    this.props.theme === 'success' && styles.successText,
                    this.props.theme === 'info' && styles.infoText,
                    this.props.theme === 'danger' && styles.dangerText,
                    this.props.theme === 'warning' && styles.warningText,
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
  successContainer: {
    backgroundColor: theme.successBackgroundColor,
  },
  successText: {
    color: theme.successColor,
  },
  infoText: {
    color: theme.infoColor,
  },
  infoContainer: {
    backgroundColor: theme.infoBackgroundColor,
  },
  dangerText: {
    color: theme.dangerColor,
  },
  dangerContainer: {
    backgroundColor: theme.dangerBackgroundColor,
  },
  warningText: {
    color: theme.warningColor,
  },
  warningContainer: {
    backgroundColor: theme.warningBackgroundColor,
  },
  text: {
    color: theme.defaultColor,
    fontSize: theme.smallFontSize
  }
})

export default Whisper
