import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers'

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingTop: scaling.moderateScale(50),
        paddingHorizontal: scaling.moderateScale(30),
    },
    content:{
        justifyContent: 'center',
    },
    messageWrong: {
        color: colour.red,
        fontSize: scaling.moderateScale(14),
        marginBottom: scaling.moderateScale(5),
    },
    socmedText: {
        marginVertical: 10,
        fontFamily: 'Avenir-Book',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey,
    }
}

export default styles;