import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  container: {
    position: 'absolute',
    top: 120,
    left: 20
  },
  carousel: {
    container: {
      height: height * 0.2,
      width: width * 0.9,
      backgroundColor: 'pink',
      borderRadius: 20,
    },
    bottomContainer: {
      height: 15,
      width: 100,
      backgroundColor: 'blue',
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    }
  }
}

export default style