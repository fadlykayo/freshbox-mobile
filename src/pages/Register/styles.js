import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingHorizontal: scaling.moderateScale(30),
        paddingTop: width * 0.05,
    },
    content:{
        justifyContent: 'center',
    },
    subcontainer: {
        button: {
            paddingVertical: width * 0.05,
        }
    }
}

export default styles;