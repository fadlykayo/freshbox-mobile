import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles'
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
    middle: {
        place: {
            flex: -1,
            height: height * 0.3,
            justifyContent: 'center',
            paddingHorizontal: scaling.moderateScale(20),
            paddingVertical: width * 0.01,
        },
        each: {
            place: {
                flex: 1,

            },
            button: {
                height: scaling.moderateScale(68),
                backgroundColor: colour.white,
                borderColor: colour.white,
                borderWidth: 1,
                shadowColor: Platform.OS == 'ios' ? colour.veryLightGreyTransparent : null,
		        shadowOffset: Platform.OS == 'ios' ? {width: 0,height: 10}  : {width: 0,height: 0},
		        shadowRadius: Platform.OS == 'ios' ? 10 : 0,
		        shadowOpacity: Platform.OS == 'ios' ?  1.0 : 0,
		        elevation: Platform.OS == 'android' ? 3 : 0,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: scaling.moderateScale(10),

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
        bank: (x) => ({
            height: x == 'virtualAccount.content.permataVA' ? scaling.moderateScale(25) : scaling.moderateScale(28),
            width: x == 'virtualAccount.content.permataVA' ? scaling.moderateScale(65) : scaling.moderateScale(79),
            marginRight: scaling.moderateScale(10)
        }),
        copy: {
            position: 'absolute',
            right: 0,
            marginRight: width * 0.05,
            height: scaling.moderateScale(15),
            width: scaling.moderateScale(15),
        }
    }
}

export default styles;