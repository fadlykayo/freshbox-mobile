import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers'

export default styles = {
  container: {
    height: scaling.moderateScale(50),
    width: scaling.moderateScale(50),
    marginHorizontal: 10
  },
  image: {
    height: scaling.moderateScale(50),
    width: scaling.moderateScale(50),
  }
}