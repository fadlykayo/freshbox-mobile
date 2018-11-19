import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    content: {
        paddingTop: width * 0.05,
    },
    intro: {
        place: {
            paddingHorizontal: width * 0.05,
            marginBottom: width * 0.05,
        }
    },
    text: {
        title: {
            fontFamily: 'Avenir-Black',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
        },
        content: {
            fontFamily: 'Avenir-Light',
            fontSize: scaling.moderateScale(13),
            color: colour.darkGrey,
        }
    },
    info: {
        place: {
            flex: -1,
        },
        title: {
            height: scaling.moderateScale(50),
            justifyContent: 'center',
            paddingHorizontal: width * 0.05,
            backgroundColor: colour.mediumGrey
        },
        arrow: {
            place: {
                position: 'absolute',
                right: 0,
                marginRight: width * 0.05,
            },
            logo: {
                height: scaling.moderateScale(10),
                width: scaling.moderateScale(10),
            }
        },
        content: {
            flex: -1,

        }
    },
    subinfo: {
        place: {
            flex: -1,
            flexDirection: 'row',
            paddingHorizontal: width * 0.05,
            paddingVertical: width * 0.02,
            minHeight: height * 0.1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        circle: {
            height: height * 0.05,
            width: height * 0.05,
            backgroundColor: colour.lightPink,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
        index: {
            color: colour.red,
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
        },
        right: {
            paddingHorizontal: width * 0.08,
        }
    },
}

export default styles;