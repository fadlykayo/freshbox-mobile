import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingTop: height* 0.05,
    },
    titleText: {
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        fontSize: scaling.moderateScale(18),
        color: colour.darkGrey,
        marginBottom: scaling.moderateScale(10),
    },
    contentText: {
        fontFamily: 'Avenir-Book',
        fontWeight: '400',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        marginBottom: scaling.moderateScale(25),
        lineHeight:20,
    }
}

export default styles;