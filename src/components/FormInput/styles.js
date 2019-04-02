import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container: (multiline) => {
        if(!multiline) {
            return {
                flex: -1,
                marginVertical: scaling.moderateScale(10), 
            }
        } else {
            return {
                flex: -1,
                marginVertical: scaling.moderateScale(10),
                height: 150,
                borderWidth: 1,
                borderColor: colour.mediumGrey,
                paddingHorizontal: 10, 
            }
        }
    },
    label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    },
    formInput: {
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey,
        paddingHorizontal: 0,
        paddingTop: scaling.moderateScale(10),
        paddingBottom: scaling.moderateScale(5)
    },
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.mediumGrey,
    },
    showPasswordButton: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    },
    icon:{
        height: scaling.moderateScale(20),
        width: scaling.moderateScale(20),
    },
}

export default styles;