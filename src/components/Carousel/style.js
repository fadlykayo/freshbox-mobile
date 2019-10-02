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
    position: 'absolute',
    height: height * 0.19,
    width: width * 0.8,
    top: scaling.isIphone5s() ? 55 : 70,
    left: scaling.isIphone5s() ? 15 : 20,
  },
  cover: {
    outerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9
    },
    container: (size) => {
      return {
        // backgroundColor: 'pink',
        borderRadius: 25,
        // position: 'absolute',
        height: height * 0.3,
        width: width * 0.9,
        
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
        flex: -1,
        height: height * 0.19,
        width: width * 0.9,
        // borderRadius: 60,
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
          // right: 135,
          // borderWidth: 1,
          // borderColor: 'red',
        }
      },

      bubble: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius: 50,
        backgroundColor: colour.grey,
      },

      bubbleActive: {
        width: 10,
        height: 10,
        backgroundColor: colour.red,
      },
    },
  },
};
