import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
	container:{
		backgroundColor: colour.white,
		flex: 1,
		marginTop: width * 0.08,
		paddingHorizontal: scaling.moderateScale(30),
    },
    formPhone: {
        flex: 1,
    },
    buttonPlace: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: width * 0.05,
    },
    text: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(14),
        color: colour.red,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: scaling.moderateScale(10),
    }
}

export default styles;