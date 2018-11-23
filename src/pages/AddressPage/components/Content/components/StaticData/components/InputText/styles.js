import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
	container:{
        flex: -1,
        marginBottom: width * 0.05,
        marginTop: scaling.moderateScale(10),
    },
    text: { 
        title: {
            fontFamily: 'Avenir-Black',
            fontSize: scaling.moderateScale(12),
            color: colour.grey,
        },
        content: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey,
            paddingVertical: scaling.moderateScale(10),
        },
    },
    underline: {
        height: 1,
        borderTopWidth: 1,
        borderColor: colour.lightGrey,
    },
}

export default styles;