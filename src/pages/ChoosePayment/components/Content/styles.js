import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: {
        flex: -1,
        height: scaling.moderateScale(50),
        borderBottomColor: colour.mediumGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    subcontainer: {
        desc:{
            flex: 1,
        },
        image:{
            flex: -1,
        }
    },
    text:{
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey
    },
    icon:{
        height: scaling.moderateScale(12),
        width: scaling.moderateScale(12)
    }
}

export default styles;