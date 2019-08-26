import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

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
  bottom: {
    container: {
      flex: 1,
      // backgroundColor: 'pink',
      // alignItems: 'center'
    },
    contentContainer: {
      alignItems: 'center',
    }
  },
  card: {
    container: {
      
      height: height * 0.08,
      width: width * 0.8,
      borderWidth: 1,
      marginVertical: 10,
    }
  }
}

export default style