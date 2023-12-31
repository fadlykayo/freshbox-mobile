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
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
        },
        content: {
            fontFamily: 'Avenir-Book',
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
            paddingVertical: width * 0.05,
            minHeight: height * 0.1,
            flexDirection: 'row',
        },
        circle: {
            height: height * 0.04,
            width: height * 0.04,
            backgroundColor: colour.lightPink,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
        index: {
            color: colour.red,
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(12),
        },
        right: {
            paddingHorizontal: width * 0.08,
        }
    },
}

export default styles;