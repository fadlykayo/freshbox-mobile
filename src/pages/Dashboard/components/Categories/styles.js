import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

export default {
  container: {
    width: width,
    height: 240,
    borderBottomColor: colour.veryLightGrey,
    borderBottomWidth: 8,
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
      height: 100,
      paddingTop: 10,
      alignItems: 'center',
    },
    container: {
      width: 50,
      height: 60,
      borderRadius: 25,
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: 12,
      textAlign: 'center',
      color: colour.darkGrey,
    },
    image: {
      height: 50, 
      width: 50
    }
  },
  page: {
    container: {
      width: width,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
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
          bottom: 5,
          left: 21,
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