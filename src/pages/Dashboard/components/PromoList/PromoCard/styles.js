import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  card: {
    container: {
      width: width * 0.35,
      height: height * 0.25,
      backgroundColor: colour.white,
      marginHorizontal: 10,
      shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
      shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
      shadowRadius: Platform.OS == 'ios' ? 30 : 0,
      shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
      elevation: Platform.OS == 'android' ? 3 : 0,
      borderRadius: 10,
    }
  }
}

export default style