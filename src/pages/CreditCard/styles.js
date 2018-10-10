import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.veryLightGrey,
    },
    scrollView: {
        backgroundColor: colour.white
    },
    content: {
        flex: 1,
        marginTop: width * 0.015,
        marginBottom: width* 0.01,
        backgroundColor: colour.white,
        paddingTop: width * 0.03,
        paddingBottom: width * 0.03,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    component: {
        height: width * 0.14,
        borderBottomColor: colour.lightGrey,
        borderBottomWidth: 0.8,
        justifyContent: 'center'
    },
    labelText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        fontWeight: '800',
        marginBottom: scaling.moderateScale(5),
    },
    middleComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: width * 0.03,
        paddingRight: width * 0.03,
    },
    expiredDatePlace: {
        width: width * 0.4
    }
}

export default styles