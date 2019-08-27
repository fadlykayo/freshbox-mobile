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
      paddingVertical: 10,
      paddingLeft: 15,
      alignItems: 'center',
      // justifyContent: 'center',
      paddingVertical: 20
    }
  },
  icon: {
    outerContainer: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
    container: {
      width: 50,
      height: 50,
      borderRadius: 25,
      // backgroundColor: 'pink',
      // marginTop: 25,
      marginHorizontal: 10,
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: 12,
      textAlign: 'center'
    },
    image: {
      height: 50, 
      width: 50
    }
  }
}