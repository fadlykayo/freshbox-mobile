import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers'

export default styles = {
  container: (type) => ({
    height: type == 'google' ? scaling.moderateScale(60) : scaling.moderateScale(45),
    width: type == 'google' ? scaling.moderateScale(60) : scaling.moderateScale(45),
    marginHorizontal: 10,
  }),
  image: (type) => ({
    height: type == 'google' ? scaling.moderateScale(60) : scaling.moderateScale(45),
    width: type == 'google' ? scaling.moderateScale(60) : scaling.moderateScale(45),
    marginHorizontal: 10
  })
}