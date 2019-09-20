import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    container: {
      height: height * 0.2,
      width: width * 0.9,
      borderRadius: 20,
      resizeMode: 'cover'
    }
  }
}

export default style