import { Platform, NativeModules, Dimensions } from 'react-native'

import { scale } from '../helpers/scalling'

const theme = {
  // Utils
  get statusBarHeight () {
    return Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT
  },

  get shoutContentHeight () {
    return scale(80)
  },

  get shoutTotalHeight () {
    return this.statusBarHeight + this.shoutContentHeight
  },

  get screenWidth () {
    return Dimensions.get('window').width
  },

  get gutter () {
    return scale(15)
  },

  // Default colors
  get baseBorderSize () {
    return 1.5
  },

  get baseBorderColor () {
    return '#E5E5E5'
  },

  get defaulBackgroundColor () {
    return '#F9F9F9'
  },

  get inverseBackgroundColor () {
    return '#000'
  },

  get defaultColor () {
    return '#333333'
  },

  get inverseColor () {
    return '#FFFFFF'
  },

  get smallFontSize () {
    return scale(10)
  },

  get baseFontSize () {
    return scale(12)
  },

  // Themes
  get successBackgroundColor () {
    return '#4CCF78'
  },

  get successColor () {
    return '#FFFFFF'
  },

  get infoBackgroundColor () {
    return '#5397D7'
  },

  get infoColor () {
    return '#FFFFFF'
  },

  get dangerBackgroundColor () {
    return '#DC524A'
  },

  get dangerColor () {
    return '#FFFFFF'
  },

  get warningBackgroundColor () {
    return '#CE5F14'
  },

  get warningColor () {
    return '#FFFFFF'
  },

  // Shout
  get shoutImageSize () {
    return scale(40)
  }

}

export default theme
