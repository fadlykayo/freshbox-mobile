import { Dimensions } from 'react-native';
import { colour } from '@styles'
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.white,
    },
    top: {
        place: {
            flex: -1,
            height: height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        innerPlace: {
            height: height * 0.17,
            width: width * 0.9,
            backgroundColor: colour.lightPink,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colour.veryLightGrey
        },
        text: {
            top: {
                fontFamily: 'Avenir-Heavy',
                fontSize: scaling.moderateScale(14),
                color: colour.darkGrey,
                lineHeight: scaling.moderateScale(25)
            },
            middle: {
                fontFamily: 'Avenir-Heavy',
                fontSize: scaling.moderateScale(18),
                color: colour.red,
                lineHeight: scaling.moderateScale(25)
            },
            bottom: {
                fontFamily: 'Avenir-Book',
                fontSize: scaling.moderateScale(12),
                color: colour.darkGrey,
                lineHeight: scaling.moderateScale(25)
            }
        }
    },
    middle: {
        place: {
            flex: -1,
            height: height * 0.31,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: width * 0.01,
        },
        each: {
            place: {
                flex: 1,
                width: width * 0.9,

            },
            button: {
                height: height * 0.08,
                borderColor: colour.lightGrey,
                borderWidth: 1,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: width * 0.03,

            },
            innerPlace: {
                top: {
                    flex: -1,
                    height: height * 0.03,
                    justifyContent: 'center',
                },
                bottom: {
                    flex: 1,
                    justifyContent: 'center'
                }
            },
            text: {
                static: {
                    fontFamily: 'Avenir-Heavy',
                    fontSize: scaling.moderateScale(14),
                    color: colour.darkGrey
                },
                price: {
                    fontFamily: 'Avenir-Heavy',
                    fontSize: scaling.moderateScale(14),
                    color: colour.red
                }
            }
        },
    },
    icon:{
        bank:{
            height: scaling.moderateScale(25),
            width: scaling.moderateScale(65),
            marginRight: scaling.moderateScale(5)
        },
    }
}

export default styles;