import {Dimensions} from 'react-native';
import {scaling} from '@helpers';
import {colour} from '@styles';

const {width, height} = Dimensions.get('window');

const styles = {
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colour.blackTranslucent,
    zIndex: 10,
  },
  container: {
    flexDirection: 'column',
    width: width * 0.9,
    borderRadius: 8,
    backgroundColor: colour.white,
    zIndex: 11,
  },
  subcontainer: {
    alignItems: 'center',
    padding: scaling.moderateScale(15),
    flex: -1,
  },
  logo: {
    height: scaling.moderateScale(36),
    width: scaling.moderateScale(36),
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontSize: scaling.moderateScale(12),
    color: colour.darkGrey,
  },
  content: {
    fontFamily: 'Avenir-Book',
    fontSize: scaling.moderateScale(12),
    color: colour.darkGrey,
  },
  buttonContainer: {
    padding: scaling.moderateScale(15),
  }
};

export default styles;