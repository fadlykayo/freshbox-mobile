import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        minHeight: height * 0.2,
        height: height * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: width * 0.1,
    },
    logo:{
        width: width * 0.1,
        height: width * 0.1,
    },
    border:{
        inner:{
            padding: scaling.moderateScale(20),
            borderWidth: scaling.moderateScale(15),
            borderRadius: 200,
            borderColor: colour.softGreenTransparent,
        },
        outer:{
            borderWidth: scaling.moderateScale(15),
            borderRadius: 100,
            borderColor: colour.softerGreenTransparent,
        }
    }
}

export default styles;