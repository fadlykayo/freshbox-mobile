import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.white,
    },
    scrollView: {
        backgroundColor: colour.white
    },
    content: {
        flex: 1,
        marginBottom: width * 0.01,
        backgroundColor: colour.white,
        paddingTop: width * 0.1,
        paddingBottom: width * 0.03,
        paddingHorizontal: width * 0.05,
    },
    top: {
        main: {
            flex: -1,
        },
        content: {
        },
    },
    text: {
        title: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Black',
            color: colour.black,
            marginBottom: width * 0.02,
        },
        content: {
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
        cvv: {
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
            width: width * 0.1
        },
        form: {
            color: 'transparent'
        },
        example: {
            fontSize: scaling.moderateScale(11),
            fontFamily: 'Avenir-Light',
            color: colour.grey,
            marginTop: scaling.moderateScale(3),
        }
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
    middle: {
        place: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        part: {
            width: width * 0.4
        }
    },
    creditCard: {
        main: {
            flex: -1,
        },
        place: {
            width: width * 0.7,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        part: (x) => ({
            width: width * 0.15,
            alignItems: 'center',
            paddingBottom: width * 0.02,
            borderBottomColor: x ? colour.red : colour.lightGrey,
            borderBottomWidth: 1,
        })
    },
    expiredDate: {
        main: {
            flex: -1,
        },
        place: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        left: (x) => ({
            width: width * 0.1,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingBottom: width * 0.02,
            marginRight: scaling.moderateScale(5),
        }),
        middle: {
            width: width * 0.05,
            alignItems: 'center',
            marginBottom: width * 0.02,
            marginRight: scaling.moderateScale(5),
        },
        right: (x) => ({
            width: width * 0.15,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingBottom: width * 0.02,
        }),
        cvv: (x) => ({
            width: width * 0.2,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingBottom: width * 0.02,
        }),
    },
    image: {
        icon: {
            position: 'absolute',
            right: 0,
            width: scaling.moderateScale(40),
            height: scaling.moderateScale(40),
            marginRight: width * 0.06,
            marginTop: width * 0.05,
        }
    }
}

export default styles