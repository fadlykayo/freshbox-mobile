import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width } = Dimensions.get('window');

const styles = {
    container: {
        backgroundColor: colour.white,
        borderTopRightRadius: scaling.moderateScale(15),
        borderTopLeftRadius: scaling.moderateScale(15),
        borderWidth: 1,
        borderColor: colour.lightGrey,
        paddingTop: width * 0.05,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        paddingBottom: width * 0.03,
    },
    subcontainer:{
        content:{
            flex: -1
        },
        price:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: scaling.moderateScale(5),
        }
    },
    text:{
        title:{
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.darkGrey
        },
        price:{
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.grey
        },
        total:{
            fontFamily: 'Avenir-Roman',
            fontSize: scaling.moderateScale(14),
            color: colour.red
        }
    }
}

export default styles;