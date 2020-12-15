import {scaling} from '@helpers';

export default styles = {
  container: (type) => ({
    height: scaling.moderateScale(type == 'google' ? 60 : type == 'apple' ? 50 : 45),
    width: scaling.moderateScale(type == 'google' ? 60 : type == 'apple' ? 50 : 45),
    marginHorizontal: 10,
  }),
  image: (type) => ({
    height: scaling.moderateScale(type == 'google' ? 60 : type == 'apple' ? 50 : 45),
    width: scaling.moderateScale(type == 'google' ? 60 : type == 'apple' ? 50 : 45),
    marginHorizontal: 10
  })
};