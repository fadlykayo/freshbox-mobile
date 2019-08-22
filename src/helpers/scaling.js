import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scaling = {}

scaling.scale = (size) => Math.round(width / guidelineBaseWidth * size);
scaling.verticalScale = (size) => Math.round(height / guidelineBaseHeight * size);
scaling.moderateScale = (size, factor = 0.5) => Math.round(size + ( scaling.scale(size) - size ) * factor);
scaling.moderateVScale = (size, factor = 0.5) => Math.round(size + ( scaling.verticalScale(size) - size ) * factor);
scaling.isIphone5s = () => {
  if (width <= 320 && height <= 568) {
    // console.warn('masuk sini')
    return true
  } else {
    return false
  } 
}

export default scaling;
