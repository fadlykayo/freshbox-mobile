import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        marginBottom: scaling.moderateScale(10),
        marginTop: scaling.moderateScale(10),
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
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.mediumGrey,
    },
}

export default styles;