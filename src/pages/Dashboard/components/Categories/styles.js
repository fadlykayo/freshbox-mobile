import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

export default {
  container: {
    width: width,
    height: 310,
    borderBottomColor: colour.veryLightGrey,
    borderBottomWidth: 8,
    // borderTopWidth: 8,
    // borderTopColor: colour.veryLightGrey,
    paddingTop: 10,
    marginTop: 5,
  },
  flatlist: {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20
    }
  },
  icon: {
    outerContainer: {
      width: 90,
      height: 120,
      paddingTop: 10,
      alignItems: 'center',
    },
    container: {
      width: 60,
      height: 60,
      borderRadius: 50,
      // backgroundColor: colour.red,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: scaling.moderateScale(10),
      textAlign: 'center',
      color: colour.darkGrey,
    },
    image: {
      height: 50, 
      width: 50
    }
  },
  text: {
    container:{
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    font: {
      fontSize: scaling.moderateScale(16),
      fontFamily: 'Avenir-Heavy',
      color: colour.darkGrey,
    }
  },
  page: {
    container: {
      flex: 1,
      width: width,
      alignItems: 'center'
    },
    innerContainer: {
      flex: 1,
      width: width <= 393 ?  width : width * 0.9,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginLeft: 10,
      
    }
  },
  cover: {
    indicator: {
      container: (top = 150, right = 155) => {
        return {
          width: width * 0.9,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          left: 20,
          // borderWidth: 1,
          // borderColor: 'red',
        }
      },

      bubble: {
        width: 6,
        height: 6,
        marginHorizontal: 4,
        borderRadius: 50,
        backgroundColor: colour.grey,
      },

      bubbleActive: {
        width: 6,
        height: 6,
        backgroundColor: colour.red,
      },
    },
  }
}