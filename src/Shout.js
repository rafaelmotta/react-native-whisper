import React from 'react'
import PropTypes from 'prop-types'

import {
  Animated,
  Easing,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native'

import theme from './config/theme'

class Shout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    image: Image.propTypes.source,

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
    imageStyle: PropTypes.shape({}),
    titleTextStyle: PropTypes.shape({}),
    subtitleTextStyle: PropTypes.shape({}),
    pusherStyle: PropTypes.shape({}),

    // Events
    onPress: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    animation: 'slide',
    animationDuration: 500,
    statusBarAnimation: 'slide',

    containerStyle: {},
    imageStyle: {},
    titleTextStyle: {},
    subtitleTextStyle: {},
    pusherStyle: {},

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

    StatusBar.setHidden(true)
    this._toggleState()
  }

  hide = () => {
    clearTimeout(this.hideTimer)
    if (!this.state.visible) return

    setTimeout(
      this._toggleStatusBar.bind(this, false),
      this.props.animationDuration
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
   * @description toggle hidden prop of status bar with custom animation
   * @param { Boolean } hide - indicate if the status bar will be hide or not
   */
  _toggleStatusBar = (hide = true) => {
    return StatusBar.setHidden(hide, this.props.statusBarAnimation)
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
      ).start(() => {
        // Event triggers
        if (this.state.visible && this.props.onShow) {
          return this.props.onShow()
        }

        if (!this.state.visible && this.props.onHide) {
          return this.props.onHide()
        }
      })
    })
  }

  render () {
    const move = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.shoutTotalHeight * -1, 0]
    })

    const transform = [{
      translateY: move
    }]

    return (
      <Animated.View style={[{ transform }]}>
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.container, this.props.containerStyle]}>
            {this.props.image && (
              <Image
                source={this.props.image}
                style={[styles.image, this.props.imageStyle]}
              />
            )}
            <View style={styles.textContainer}>
              <Text
                style={[styles.titleText, this.props.titleTextStyle]}
                numberOfLines={1}
              >
                {this.props.title}
              </Text>
              <Text
                style={[styles.subtitleText, this.props.subtitleTextStyle]}
                numberOfLines={1}
              >
                {this.props.subtitle}
              </Text>
            </View>
            <View style={[styles.pusher, this.props.pusherStyle]} />
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
    paddingBottom: theme.gutter,
    zIndex: 1500,
    backgroundColor: theme.inverseBackgroundColor,
    height: theme.shoutContentHeight,
    width: theme.screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: theme.baseBorderSize,
    borderBottomColor: theme.baseBorderColor,
    flexDirection: 'row',
    paddingLeft: theme.gutter
  },
  image: {
    width: theme.shoutImageSize,
    height: theme.shoutImageSize,
    borderRadius: theme.shoutImageSize / 2
  },
  textContainer: {
    marginLeft: theme.gutter
  },
  titleText: {
    color: theme.inverseColor,
    fontSize: theme.baseFontSize,
    marginBottom: theme.gutter / 5,
    fontWeight: '700'
  },
  subtitleText: {
    color: theme.inverseColor,    
    fontSize: theme.smallFontSize
  },
  pusher: {
    position: 'absolute',
    height: theme.gutter / 3,
    width: theme.gutter * 3,
    backgroundColor: theme.baseBorderColor,
    bottom: theme.gutter / 3,
    borderRadius: theme.gutter / 3,
    left: (theme.screenWidth / 2) - ((theme.gutter * 3) / 2)
  }
})

export default Shout
