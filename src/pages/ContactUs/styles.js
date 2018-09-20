import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    content:{
        flex: 1,
    },
    middleComponent: {
        flex: 1,
    },
    bottomComponent: {
        marginTop: height * 0.1,
        flex: -1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.16,
    },
    submitButton: {
        width: width * 0.9,
        height: height * 0.09,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colour.red,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colour.white,
    },
    submitText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        fontWeight: '500',
        color: colour.white
    }
}

export default styles;