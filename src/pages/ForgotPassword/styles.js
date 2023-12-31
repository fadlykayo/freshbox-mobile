import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingHorizontal: scaling.moderateScale(30),
    },
    content:{
        // flex: 1,
    },
    messageWrong: {
        color: colour.red,
        fontSize: scaling.moderateScale(14),
        marginBottom: scaling.moderateScale(5),
    },
    button: {
        marginTop: width * 0.05,
    }
}

export default styles;