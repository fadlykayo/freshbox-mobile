import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.white,
        paddingTop: height * 0.05,
        paddingHorizontal: width * 0.05,
    },
    content: {
        alignItems: 'center',
    },
    otp: {
        place: {
            flex: -1,
            height: height * 0.2,
            width: width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
    },
    static: {
        place: {
            flex: 1,
            width : width * 0.8,
            paddingTop: width * 0.025,
            alignItems: 'center',
        },
        text: {
            red: {
                fontFamily: 'Avenir-Heavy',
                fontSize: scaling.moderateScale(14),
                color: colour.red,
                paddingVertical: width * 0.025,
                textAlign: 'center'
            },
            grey: {
                fontFamily: 'Avenir-Roman',
                fontSize: scaling.moderateScale(14),
                color: colour.grey,
                paddingVertical: width * 0.025,
                textAlign: 'center'
            },
            darkGrey: (type) => ({
                fontFamily: 'Avenir-Roman',
                fontSize: scaling.moderateScale(14),
                color: colour.darkGrey,
                textDecorationLine: type ? 'underline' : 'none',
                paddingVertical: width * 0.025,
                textAlign: 'center'
            })
        }
    },
    resend: {
        place: {
            flexDirection: 'row',
        },
        button: {
            marginRight: width * 0.02,
        }
    },
    textinput: {
        text: {
            color: 'transparent'
        }
    },
    button: {
        container: {
            width: scaling.moderateScale(80),
        }
    }
    
}

export default styles;