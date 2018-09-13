import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
  overlay: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.9,
    backgroundColor: colour.black,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
},
result: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scaling.moderateScale(100),
    width: width * 0.9,
    borderWidth: 1,
    borderColor: colour.white,
    borderRadius: 8,
    backgroundColor: colour.white,
    marginBottom: scaling.moderateScale(10),
},
logo: {
    position: 'absolute',
    height: scaling.moderateScale(40),
    width: scaling.moderateScale(40),
    left: scaling.moderateScale(20),
}
}

export default styles;