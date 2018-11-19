import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: scaling.moderateScale(10),
    },
}

export default styles;