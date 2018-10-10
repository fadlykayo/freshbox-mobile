import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.veryLightGrey,
    },
    content: {
        flex: 1,
        marginTop: width * 0.015,
        marginBottom: width* 0.01,
        backgroundColor: colour.white,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    component: {
        height: width * 0.14,
        borderBottomColor: colour.lightGrey,
        borderBottomWidth: 0.8,
        justifyContent: 'center'
    },
    staticText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(12),
        fontWeight: '800',
        color: colour.darkGrey
    },
    imagePlace: {
        position: 'absolute',
        right: 0,
        marginRight: scaling.moderateScale(10),
    },
    logo: {
        height: scaling.moderateScale(10),
        width: scaling.moderateScale(10)
    }
}

export default styles;