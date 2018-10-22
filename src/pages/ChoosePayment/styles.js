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
        marginBottom: width * 0.01,
        backgroundColor: colour.white,
    },
    component: {
        height: scaling.moderateScale(50),
        borderBottomColor: colour.lightGrey,
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    staticText: {
        fontFamily: 'Avenir-Black',
        fontSize: scaling.moderateScale(12),
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