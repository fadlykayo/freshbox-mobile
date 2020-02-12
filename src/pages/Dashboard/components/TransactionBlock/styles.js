import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  container: {
    flex: 1,
    paddingVertical: scaling.moderateScale(10),
    
  },
  top: {
    container: {
      flex: -1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      
    },
    left: {
      // paddingHorizontal: 20,
    },
    right: {
      // paddingHorizontal: 20,
    },
    textPromo: {
      fontSize: scaling.moderateScale(16),
      fontFamily: 'Avenir-Heavy',
      color:colour.darkGrey
    },
    textMore: {
      fontSize: scaling.moderateScale(14),
      fontFamily: 'Avenir-Heavy',
      color: colour.red
    }
  },
  bottom: {
    container: {
      flex: 1,
      // height: 200,
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
      // paddingVertical: scaling.moderateScale(15),
      paddingLeft: 20,
      // alignItems: 'center',
      // justifyContent: 'center',
      // backgroundColor: 'blue'
    },
  },
  card: {
    container: (singleTransaction) => ({
      backgroundColor: colour.white,
      flex: -1,
      width: singleTransaction ? width * 0.9 : width * 0.8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      // borderWidth: 1,
      borderRadius: 8,
      // borderColor: colour.white,
      shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
      shadowOffset: Platform.OS == 'ios' ? {
        width: 0,
        height: 2,
      } : {
        width: 0,
        height: 0,
      },
      shadowOpacity: Platform.OS == 'ios' ? 2 : 0,
      shadowRadius: Platform.OS == 'ios' ? 5 : 0,

      elevation: Platform.OS == 'android' ? 3 : 0,
      marginRight: 10,
      marginLeft: 3,
      // backgroundColor: 'blue'
      marginVertical: 10,
    }),
    emptyContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems:'center', 
      flex: 1, 
      paddingRight: 20, 
      paddingLeft: 5, 
      marginTop: 20,
    },
    buttonNav: {
      flex: -1,
      width: 130,
      height: 40,
    },
    transactionText: {
      fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(14),
        textAlign: 'left',
        color: colour.darkGrey,
    },
    invoice: {
      container: {
        paddingTop: 20,
      },
      text: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        textAlign: 'left',
        marginBottom: 5,
        color: colour.darkGrey,
      }
    },
    items: {
      text: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
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
        fontSize: scaling.moderateScale(14),
        textAlign: 'left',
        color: colour.darkGrey,
      }
    },
    button: {
      container: {
        height: 39,
        width: width * 0.35,
        // marginTop: 15,
        // marginRight: 10,
      }
    }
  }
}

export default style