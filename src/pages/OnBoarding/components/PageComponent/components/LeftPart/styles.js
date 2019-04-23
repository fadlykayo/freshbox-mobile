import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    subContainer: {
        red: {

            flex: 1,
            backgroundColor: colour.red

        },
    },
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
        },
    },
    skip: {
        place: {
            flex: -1,
            height: height * 0.1,
            paddingHorizontal: width * 0.05,
            marginBottom: width * 0.03,
            justifyContent: 'center',
        },
        button: {

            height: width * 0.1,
            width: width * 0.2,
            justifyContent: 'center',
        },
        text: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(16),
            color: colour.white,
        }
    },
}

export default styles;