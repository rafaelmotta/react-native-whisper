import { Platform, NativeModules, Dimensions } from 'react-native'

import { scale } from '../helpers/scalling'

const theme = {
  // Utils
  get statusBarHeight () {
    return Platform.OS === 'ios' ? 20 : NativeModules.StatusBarManager.HEIGHT
  },

  get screenWidth () {
    return Dimensions.get('window').width
  },

  // Default colors
  get defaulBackgroundColor () {
    return '#F9F9F9'
  },

  get defaultColor () {
    return '#333333'
  },

  get smallFontSize () {
    return scale(11)
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
  }
}

export default theme
