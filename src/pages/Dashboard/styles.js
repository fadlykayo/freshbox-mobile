import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const style = {
  content: {
    flex: 1,
    borderRadius: 100
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: colour.white,
    // height: height * 0.85,
    // width: width,
    // position: 'absolute',
    // bottom: 0,
  },
  spacer: {
    height: height * 0.05
  },
  scrollView: {
    flex: 1,
    backgroundColor: colour.red
  }
}

export default style;