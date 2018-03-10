import React from 'react'
import PropTypes from 'prop-types'

import {
  Animated,
  Easing,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native'

import theme from './config/theme'

class Whistle extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,

    // Behaviors
    delayToShow: PropTypes.number,

    // Animations
    animation: PropTypes.oneOf([
      // Future: Add fade and other animations
      'slide'
    ]),
    animationDuration: PropTypes.number,
    statusBarAnimation: PropTypes.oneOf([
      'none',
      'fade',
      'slide'
    ]),

    // Styles
    theme: PropTypes.oneOf([
      'success',
      'info',
      'danger',
      'warning'
    ]),

    containerStyle: PropTypes.shape({}),
    textStyle: PropTypes.shape({}),

    // Events
    onPress: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    delayToShow: 250,

    animation: 'slide',
    animationDuration: 250,
    statusBarAnimation: 'slide',

    theme: null,

    containerStyle: {},
    textStyle: {},

    onPress: null,
    onShow: null,
    onHide: null
  }

  state = {
    visible: false
  }

  constructor () {
    super()
    this.animationValue = new Animated.Value(0)
    this.hideTimer = null
  }

  componentWillUnmount () {
    clearTimeout(this.hideTimer)
  }

  /**
   * Indicate if the whistle is visible or not
   * @return { Boolean }
   */
  get isVisible () {
    return this.state.visible
  }

  /**
   * @description Show Whistle
   * @param { Object } options - custom options, now only duration available
   */
  show = (options = {}) => {
    if (this.state.visible) return

    // Duration to autoHide the whistle after some time
    if (options.duration) {
      const type = typeof options.duration
      if (type !== 'number') {
        throw new Error(`Duration must be a number. You sent a ${type}`)
      }

      clearTimeout(this.hideTimer)
      this.hideTimer = setTimeout(this.hide.bind(this), options.duration)
    }

    this._toggleStatusBar()
    return setTimeout(
      this._toggleState.bind(this),
      this.props.delayToShow
    )
  }

  /**
   * @description Hide Whistle
   */
  hide = () => {
    clearTimeout(this.hideTimer)
    if (!this.state.visible) return

    setTimeout(
      this._toggleStatusBar.bind(this, false),
      this.props.delayToShow
    )

    return this._toggleState()
  }

  /**
   * @description Toggle state of whistle
   */
  toggle = () => {
    return this[this.state.visible ? 'hide' : 'show']()
  }

  /**
   * @description toggle state of the whistle component
   */
  _toggleState = () => {
    return this.setState((prevState) => {
      return {
        visible: !prevState.visible
      }
    }, () => {
      const options = {
        toValue: this.state.visible ? 1 : 0,
        duration: this.props.animationDuration,
        easing: Easing.linear
      }

      Animated.timing(
        this.animationValue, options
      ).start()

      // Event triggers
      if (this.state.visible && this.props.onShow) {
        return this.props.onShow()
      }

      if (!this.state.visible && this.props.onHide) {
        return this.props.onHide()
      }
    })
  }

  /**
   * @description toggle hidden prop of status bar with custom animation
   * @param { Boolean } hide - indicate if the status bar will be hide or not
   */
  _toggleStatusBar = (hide = true) => {
    return StatusBar.setHidden(hide, this.props.statusBarAnimation)
  }

  render () {
    const move = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.statusBarHeight * -1, 0]
    })

    const transform = [{
      translateY: move
    }]

    return (
      <Animated.View style={[{ transform }]}>
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
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1500,
    backgroundColor: theme.defaulBackgroundColor,
    height: theme.statusBarHeight,
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  successContainer: {
    backgroundColor: theme.successBackgroundColor
  },
  successText: {
    color: theme.successColor
  },
  infoText: {
    color: theme.infoColor
  },
  infoContainer: {
    backgroundColor: theme.infoBackgroundColor
  },
  dangerText: {
    color: theme.dangerColor
  },
  dangerContainer: {
    backgroundColor: theme.dangerBackgroundColor
  },
  warningText: {
    color: theme.warningColor
  },
  warningContainer: {
    backgroundColor: theme.warningBackgroundColor
  },
  text: {
    color: theme.defaultColor,
    fontSize: theme.smallFontSize
  }
})

export default Whistle
