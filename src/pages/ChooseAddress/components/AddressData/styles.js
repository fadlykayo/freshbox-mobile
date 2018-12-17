import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container: (i,length) => ({
        flex: -1,
        paddingVertical: width * 0.04,
        marginLeft: scaling.moderateScale(30),
        paddingRight: scaling.moderateScale(30),
        borderBottomWidth: i < length ? 1 : 0,
        borderBottomColor: colour.mediumGrey,
        flexDirection: 'row',
    }),
    subcontainer: {
        left: {
            flex: 1,
        },
        right: {
            flex: -1,
            width: width * 0.2,
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
    },
    place: {
        pen: {
            position: 'absolute',
            right: 0,
            top: 0,
            width: width * 0.07,
            height: width * 0.07,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: width * 0.04,
            marginRight: scaling.moderateScale(30),
        }
    },
    logo: {
        pen: {
            height: scaling.moderateScale(12),
            width: scaling.moderateScale(12)
        },
    },
    circle: {
        outer: {
            borderRadius: 100,
            borderWidth: 1.5,
            borderColor: colour.red,
            height: scaling.moderateScale(14),
            width: scaling.moderateScale(14),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: width * 0.015,
        },
        inner: {
            backgroundColor: colour.red,
            height: scaling.moderateScale(8),
            width: scaling.moderateScale(8),
            borderRadius: 100,
        }
    },
    text: {
        priority: {
            color: colour.red,
            fontSize: scaling.moderateScale(10)
        },
        receiver: {
            fontFamily: 'Avenir-Heavy',
		    fontSize: scaling.moderateScale(12),
		    color: colour.darkGrey,
		    marginBottom: scaling.moderateScale(7),
        },
        address: {
            fontFamily: 'Avenir-Roman',
		    fontSize: scaling.moderateScale(12),
		    color: colour.darkGrey,
		    marginBottom: scaling.moderateScale(7),
        },
        nameAddress: {
            color: colour.grey
        }
    },
}

export default styles