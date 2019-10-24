import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {

  container: {
    flex: -1,
    // marginTop: 10
    // backgroundColor: 'pink',
    // height: height,
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
      color: colour.darkGrey,
    },
    textMore: {
      fontSize: 15,
      fontFamily: 'Avenir-Heavy',
      color: colour.red
    }
  },
  promo: {
    container: {
      height: 230,
      flex: -1,
      paddingLeft: 15,
      paddingHorizontal: 10,
      // borderWidth: 1,
      
    },
    card: {
      marginVertical: 10
    },
  },

}

export default style