import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: width * 0.07,
        paddingTop: width * 0.03,
    },
    subcontainer: {
        phone: {
            flex: -1,
            borderBottomColor: colour.mediumGrey,
            borderBottomWidth: 1,
            marginBottom: scaling.moderateScale(15),
            justifyContent: 'center'
        },
        address: {
            flex: -1,
            borderBottomColor: colour.mediumGrey,
            borderBottomWidth: 1,
            marginBottom: scaling.moderateScale(15),
            justifyContent: 'center'
        },
        password: {
            flex: -1,
            borderBottomColor: colour.mediumGrey,
            borderBottomWidth: 1,
            marginBottom: scaling.moderateScale(25),
            justifyContent: 'center'
        }
    },
    text: {
        title: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Black',
            color: colour.grey,
            marginBottom: scaling.moderateScale(7),
        },
        content: {
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Medium',
            color: colour.darkGrey,
            marginBottom: scaling.moderateScale(15),
        }
    },
    icon: {
        send: {
            position: 'absolute',
            right: 0,
            height: scaling.moderateScale(18),
            width: scaling.moderateScale(18),
        }
    },
}

export default styles;