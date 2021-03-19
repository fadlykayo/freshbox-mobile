import { Dimensions } from 'react-native';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    scrollView:{
        marginTop: scaling.moderateScale(5),
    },
    categories:{
        flex: 1,
        paddingTop: width* 0.03,
        paddingBottom: width* 0.05,
        paddingLeft: scaling.moderateScale(30),
    }
}

export default styles;

