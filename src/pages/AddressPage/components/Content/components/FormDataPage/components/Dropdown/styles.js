import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        marginVertical: scaling.moderateScale(10),
    },
    text: {
        label: {
            fontFamily: 'Avenir-Heavy',
            fontSize: scaling.moderateScale(12),
            color: colour.darkGrey,
        },
        placeholder: {
            fontFamily: 'Avenir-Book',
            fontSize: scaling.moderateScale(14),
            color: colour.lightGrey,
            paddingHorizontal: 0,
            paddingTop: scaling.moderateScale(10),
            paddingBottom: scaling.moderateScale(5)
        },
        content: {
            color: colour.darkGrey,
        }
    },
    arrow: {
        place: {
            position: 'absolute',
            right: scaling.moderateScale(10),
            bottom: scaling.moderateScale(10),
        },
        icon: {
            height: scaling.moderateScale(10),
            width: scaling.moderateScale(10),
        }
    },
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.mediumGrey,
    },
    dropdown: {
        place: {
            maxHeight: scaling.moderateScale(200),
            backgroundColor: colour.white,
            borderColor: colour.mediumGrey,
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: scaling.moderateScale(10),
        },
        part: {
            height: scaling.moderateScale(50),
            width: width * 0.9,
            borderColor: colour.lightGrey,
            borderBottomWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
}

export default styles;