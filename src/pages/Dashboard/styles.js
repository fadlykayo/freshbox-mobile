import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  content: {
    backgroundColor: colour.red,
    flex: 1,
    borderRadius: 100
  },
  content2: {
    backgroundColor: colour.white,
    height: height * 0.7,
    width: width,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  }
}

export default style;