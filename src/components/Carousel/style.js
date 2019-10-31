import {
  scaling
  
} from '@helpers';

import { Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
import { colour } from '@styles';



import {
  Sizes,
  Fonts,
  Colors,
} from '@constants';

module.exports = {
  outerContainer: {
    // position: 'absolute',
    width: width,
    height: 600 / (1200/(width)),
    // top: scaling.isIphone5s() ? 55 : 60,
    // left: scaling.isIphone5s() ? 15 : 20,
    // borderRadius: 20,
    // backgroundColor: 'pink',
    // marginTop: -((600/(1200/(width * 0.9)))/2),
    // marginLeft: 15,
    marginBottom: 20,
    
  },
  cover: {
    outerContainer: {
      // justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: 600 / (1200/(width)),
      // borderRadius: 20,
      // backgroundColor: 'pink'
      
    },
    container: (size) => {
      return {
        // backgroundColor: 'pink',
        // borderRadius: 10,
        // position: 'absolute',
        // height: height * 0.3,
        // width: width * 0.9,
        
        
      }
    },

    overlayContainer: (size) => {
      return {
        // flex: 1,
        width: width,
        height: size ? size : 14,
        paddingVertical: 1.5,
        paddingHorizontal: 20,
        position: 'absolute',
        top: 15,
        // borderWidth: 1,
        // borderColor: 'red',
      }
    },

    image: (size) => {
      return {
        // flex: -1,
        width: width,
        height: 600 / (1200/(width)),
        // borderRadius: 20,
      }
    },

    title: {
      container: {
        flex: -1,
        width: width * 0.5,
        paddingVertical: 5,
        justifyContent: 'center',
        overflow: 'scroll',
        marginTop: 20,
        // borderWidth: 1,
        // borderColor: 'red',
      },

      text: {
        lineHeight: 22,
        fontSize: 18,
        // fontFamily: Fonts.sfBold,
        fontWeight: 'bold',
        color: colour.white,
        textAlign: 'left',
      },
    },

    emptyStateView: {
      flex: 1,
      backgroundColor: colour.grey,
      justifyContent: 'center',
      alignItems: 'center',
    },

    emptyText: {
      // fontFamily: Fonts.sfBold,
      fontWeight: 'bold',
      fontSize: 14,
      color: 'pink'
    },

    indicator: {
      container: (top = 140, right = 155) => {
        return {
          width: width * 0.9,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
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
    
  },
  button: {
      container: {
        position: 'absolute', 
        bottom: 10, 
        right: 10,
        width: 110,
        height: 34,
        borderRadius: 50,
        backgroundColor: colour.black10opacity,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        fontFamily: 'Avenir-Heavy',
        fontWeight: 'bold',
        fontSize: 14,
        color: colour.white
      }
    }
};
