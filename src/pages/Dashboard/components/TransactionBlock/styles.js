import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const style = {
  container: {
    flex: 1,
    // backgroundColor: 'pink'
  },
  top: {
    container: {
      flex: -1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    left: {
      paddingHorizontal: 25,
    },
    right: {
      paddingHorizontal: 25,
    },
    textPromo: {
      fontSize: 17,
      fontFamily: 'Avenir-Heavy',
    },
    textMore: {
      fontSize: 14,
      fontFamily: 'Avenir-Heavy',
      color: colour.red
    }
  },
}

export default style