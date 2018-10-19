import { Dimensions } from 'react-native';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    scrollView:{
        marginTop: scaling.moderateScale(9),
    },
    categories:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: width* 0.05,
        paddingBottom: width* 0.05,
        paddingRight: width* 0.04,
        paddingLeft: width* 0.06,
    }
}

export default styles;