import { Dimensions } from 'react-native';
import { colour } from '@styles'
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
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
            borderColor: colour.veryLightGrey,
            paddingHorizontal: width * 0.05
        },
        text: {
            top: {
                fontFamily: 'Avenir-Heavy',
                fontSize: scaling.moderateScale(12),
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
                fontFamily: 'Avenir-Heavy',
                fontSize: scaling.moderateScale(16),
                color: colour.red,
                lineHeight: scaling.moderateScale(25),
                textAlign: 'center'
            }
        }
    },
}

export default styles;