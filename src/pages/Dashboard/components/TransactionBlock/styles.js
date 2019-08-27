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
      
      height: height * 0.09,
      width: width * 0.85,
      // borderWidth: 1,
      marginVertical: 10,
      flexDirection: 'row',
      // alignItems: 'flex-end',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colour.white,
      shadowColor: Platform.OS == 'ios' ? '#C7CACF' : null,
      shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
      shadowRadius: Platform.OS == 'ios' ? 30 : 0,
      shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
      elevation: Platform.OS == 'android' ? 3 : 0,
    },
    invoice: {
      text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 14,
        textAlign: 'left',
        color: colour.black,
      }
    },
    items: {
      text: {
        fontFamily: 'Avenir-Roman',
        fontSize: 12,
        textAlign: 'left',
        color: colour.grey,
      }
    },
    grandTotal: {
      text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 16,
        textAlign: 'left',
        color: colour.black,
      }
    }
  }
}

export default style