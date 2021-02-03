import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        backgroundColor: colour.veryLightGrey,
        padding: scaling.moderateScale(20),
    },
    text: {
        static: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(14),
            color: colour.grey,
            marginBottom: scaling.moderateScale(4),
        },
        detail: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(18),
        },
        user: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(4),
        }
    },
    info: {
       container: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            borderColor: colour.orange,
            marginBottom: 15,
        },
        icon: {
            width: 15,
            height: 15,
            marginRight: scaling.moderateScale(10),
        },
        text: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(11),
            color: colour.orange,
            lineHeight: scaling.moderateScale(16),
            paddingRight: scaling.moderateScale(20),
        }
    }
}

export default styles;