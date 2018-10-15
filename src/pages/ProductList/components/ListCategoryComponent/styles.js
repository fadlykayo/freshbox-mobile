import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    scrollView: {
        marginTop: scaling.moderateScale(9),
    },
    categories: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: width* 0.05,
        paddingBottom: width* 0.05,
        paddingRight: width* 0.04,
        paddingLeft: width* 0.06,
    },
    eachCategory: {
        height: width * 0.27,
        width: width * 0.27,
        borderColor: colour.lightGrey,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colour.white,
        marginRight: width* 0.03,
        marginBottom: width* 0.03,
        padding: scaling.moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: scaling.moderateScale(60),
        width: scaling.moderateScale(60),
        marginBottom: scaling.moderateScale(5),
    },
    checkPlace: {
        height: scaling.moderateScale(15),
        width: scaling.moderateScale(15),
        borderColor: colour.lightGrey,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: scaling.moderateScale(5),
        marginRight: scaling.moderateScale(5),
    },
    check: {
        height: scaling.moderateScale(10),
        width: scaling.moderateScale(10),
    },
    categoryText: {
        fontWeight: 'bold',
        fontFamily: 'Avenir-Light',
        fontSize: scaling.moderateScale(12)
    }
}

export default styles;