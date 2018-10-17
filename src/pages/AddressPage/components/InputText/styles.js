import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	formContainer:{
        flex: -1,
        marginBottom: width * 0.05,
        marginTop: scaling.moderateScale(10),
    },
	label: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        fontWeight: '500',
        color: colour.grey,
	},
	input: {
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(14),
        fontWeight: '400',
        color: colour.darkGrey,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: scaling.moderateScale(10),
		paddingBottom: scaling.moderateScale(5),
		marginBottom: scaling.moderateScale(5),
    },
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.lightGrey,
    },
}

export default styles;