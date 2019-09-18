import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  container: {
    flex: 1,
    // backgroundColor: 'pink'
    // borderWidth: 1,
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
      color:colour.darkGrey
    },
    textMore: {
      fontSize: 15,
      fontFamily: 'Avenir-Heavy',
      color: colour.red
    }
  },
  bottom: {
    container: {
      flex: 1,
      // backgroundColor: 'pink',
      // alignItems: 'center',
      flexDirection: 'row',
      
    },
    contentContainer: {
      alignItems: 'center',
      
    },
    outerContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 20,
      marginTop: 10,
      // borderWidth: 1,
    },
  },
  card: {
    container: {
      backgroundColor: colour.white,
      flex: -1,
      width: width * 0.6,
      height: 110,
      marginVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      borderWidth: 1,
      marginRight: 15,
      
    },
    text: {
      container: {
        marginVertical: 10,
        marginHorizontal: 5,
      }
    },
    invoice: {
      container: {
        paddingTop: 20,
      },
      text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 12,
        textAlign: 'left',
        color: colour.darkGrey,
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
      container: {
        marginTop: 5,
        paddingBottom: 18,
        // backgroundColor: 'pink'
      },
      text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: 16,
        textAlign: 'left',
        color: colour.darkGrey,
      }
    },
    button: {
      container: {
        height: 40,
        width: width * 0.35,
        marginTop: 15
      }
    }
  }
}

export default style