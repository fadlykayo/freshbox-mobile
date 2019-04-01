import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { height, width } = Dimensions.get('window');

const styles = {
    topComponent: {
        flex: -1,
        height: height * 0.43,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        outer: {
            height: width * 0.42,
            width: width * 0.42,
            borderRadius: 100,
            borderWidth: 20,
            borderColor: colour.hotPink,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inner: {
            height: width * 0.33,
            width: width * 0.33,
            borderRadius: 100,
            backgroundColor: colour.pink,
            alignItems: 'center',
        },
        image: {
            marginTop: 20,
        }
    },
}

export default styles;