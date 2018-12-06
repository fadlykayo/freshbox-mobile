import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    info: {
        flex: 1,
        paddingHorizontal: width * 0.05,
    },
    title: {
        text: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(20),
            color: colour.white,
            lineHeight: scaling.moderateScale(24),
            marginBottom: scaling.moderateScale(10),
        }
    },
    contentText: {
        place: {
            width: width * 0.7
        }, 
        text: {
            fontFamily: 'Avenir-Light',
            fontSize: scaling.moderateScale(13),
            color: colour.white,
            lineHeight: scaling.moderateScale(21),
        },
        italic: {
            fontStyle: 'italic'
        }
    },
}

export default styles;