import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers'

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingTop: width * 0.05,
        paddingHorizontal: width * 0.05,
    },
    content:{
        // flex: 1,
        justifyContent: 'center',
    },
    messageWrong: {
        color: colour.red,
        fontSize: scaling.moderateScale(14),
        marginBottom: scaling.moderateScale(5),
    }
}

export default styles;