import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

export default {
  container: {
    flex: -1,
    // backgroundColor: 'blue',
    // alignContent: 'center',
    
  },
  flatlist: {
    container: {
      paddingVertical: 5,
      paddingLeft: 15,
      alignItems: 'center',
      // justifyContent: 'center',
      // paddingVertical: 20
    }
  },
  icon: {
    outerContainer: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
    container: {
      width: 60,
      height: 60,
      borderRadius: 25,
      // backgroundColor: 'pink',
      // marginTop: 25,
      // marginHorizontal: 10,
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: 12,
      textAlign: 'center',
      color: colour.darkGrey
    },
    image: {
      height: 60, 
      width: 60
    }
  }
}