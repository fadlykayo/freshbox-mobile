import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  container: {
    flex: 1,
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
  promo: {
    container: {
      flex: 1,
      paddingVertical: 10,
      paddingLeft: 15,
    }
  }
}

export default style