import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colour.white,
    // paddingHorizontal: 20,
    // paddingVertical: 20,
  },
  card: {
    outerContainer: {
      marginVertical: 10,
      // marginHorizontal: 10,
      shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
      shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
      shadowRadius: Platform.OS == 'ios' ? 30 : 0,
      shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
      elevation: Platform.OS == 'android' ? 3 : 0,
    },
    container: {
      alignSelf: 'center',
      height: 600 / (1200/(width * 0.9)),
      width: width * 0.9,
      borderRadius: 10,
      resizeMode: 'cover',
    }
  }
}

export default style