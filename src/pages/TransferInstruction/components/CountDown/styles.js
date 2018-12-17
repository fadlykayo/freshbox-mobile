import { Dimensions } from 'react-native';
import { colour } from '@styles'
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flex: -1,
        alignItems: 'center',
        paddingBottom: width * 0.03,
    },
    subcontainer: {
        inner: {
            flex: 1,
            backgroundColor: colour.lightPink,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colour.white,
            paddingHorizontal: width * 0.05,
            paddingVertical: width * 0.05,
        }
    },
    text: {
        top: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(12),
            color: colour.darkGrey,
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
}

export default styles;