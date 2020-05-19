import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        backgroundColor: colour.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: width * 0.5,
    },
    version: {
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
        color: colour.white,
        position: 'absolute',
        bottom: 20,
        // right: 10,
    },
    update: {
        container: {
            flex: -1,
            // borderWidth: 1,
            // borderColor: 'white',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(12),
            color: colour.white,
            marginBottom: 10,
        },
        skip: {
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(12),
            color: colour.white,
            marginTop: 20,
        }
    }
}

export default styles;