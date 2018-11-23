import { Dimensions, Platform } from 'react-native';
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
        marginBottom: height * 0.2,
        backgroundColor: colour.white,
        paddingTop: width * 0.06,
        paddingBottom: width * 0.03,
        paddingHorizontal: width * 0.05,
    },
    top: {
        main: {
            flex: -1,
        },
        content: (x) => ({
            width: width * 0.7,
            borderBottomWidth: 1,
            borderBottomColor: x ? colour.red : colour.lightGrey,
            marginBottom: width * 0.03,
        }),
        
    },
    text: {
        title: {
            fontSize: scaling.moderateScale(12),
            fontFamily: 'Avenir-Black',
            color: colour.black,
        },
        creditCard: {
            paddingVertical: scaling.moderateScale(10),
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
        content: {
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
        expMonth: {
            width: width * 0.15,
            textAlign: 'center',
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
        expYear: {
            width: width * 0.15,
            textAlign: 'center',
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
        },
        cvv: {
            width: width * 0.2,
            fontSize: scaling.moderateScale(14),
            fontFamily: 'Avenir-Light',
            color: colour.darkGrey,
            width: width * 0.1,
        },
        form: {
            color: 'transparent',
        },
        example: {
            fontSize: scaling.moderateScale(11),
            fontFamily: 'Avenir-Light',
            color: colour.grey,
            marginTop: scaling.moderateScale(5),
        }
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
        place: {
            width: width * 0.7,
        },
        part: (x,y) => ({
            width: width * 0.15,
            alignItems: 'center',
            paddingVertical: y > 0 ? width * 0.03 : width * 0.04,
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
            alignItems: 'center',
        },
        left: (x) => ({
            width: width * 0.15,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: width * 0.02,
            marginRight: scaling.moderateScale(5),
        }),
        middle: {
            width: width * 0.05,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: scaling.moderateScale(5),
        },
        right: (x) => ({
            width: width * 0.15,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: width * 0.02,
        }),
        cvv: (x) => ({
            width: width * 0.2,
            borderBottomColor: x ? colour.red : colour.grey,
            borderBottomWidth: 1,
            alignItems: 'center',
            paddingVertical: width * 0.02,
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
        },
        cardLogo: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: scaling.moderateScale(50),
            height: scaling.moderateScale(50),
            marginRight: scaling.moderateScale(15),
            marginTop: scaling.moderateScale(10),
        }
    }
}

export default styles