import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers'

export default styles = {
  container: (type) => ({
    height: type == 'facebook' ? scaling.moderateScale(45) : scaling.moderateScale(60),
    width: type == 'facebook' ? scaling.moderateScale(45) : scaling.moderateScale(60),
    marginHorizontal: 10,
  }),
  image: (type) => ({
    height: type == 'facebook' ? scaling.moderateScale(45) : scaling.moderateScale(60),
    width: type == 'facebook' ? scaling.moderateScale(45) : scaling.moderateScale(60),
    marginHorizontal: 10
  })
}