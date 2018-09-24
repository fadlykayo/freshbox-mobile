import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
		flex: 1,
        backgroundColor: colour.white,
    },
    background:{
        width: width,
        height: height * 0.37,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableBackButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: width * 0.05,
        marginLeft: width * 0.05,
    },
    backButton: {
        height: scaling.moderateScale(22),
        width: scaling.moderateScale(22),
    },
    photo: {
        height: width * 0.2,
        width: width * 0.2,
        marginBottom: width* 0.05,
    },
    userName: {
        fontSize: scaling.moderateScale(16),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        color: colour.white,
        marginBottom: scaling.moderateScale(4),
    },
    userEmail: {
        fontSize: scaling.moderateScale(12),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '400',
        color: colour.white,
    },
    middleComponent: {
        flex: 1,
        paddingLeft: width * 0.07,
        paddingRight: width * 0.07,
        paddingTop: width * 0.03,
    },
    phoneComponent: {
        height: height * 0.09, 
        borderBottomColor: colour.grey,
        borderBottomWidth: 0.5,
        marginBottom: scaling.moderateScale(25),
        justifyContent: 'center'
    },
    addressComponent: {
        height: height * 0.12, 
        borderBottomColor: colour.grey,
        borderBottomWidth: 0.5,
        marginBottom: scaling.moderateScale(25),
        justifyContent: 'center'
    },
    addressSpace: {
        width: width * 0.75
    },
    passwordComponent: {
        height: height * 0.09, 
        borderBottomColor: colour.grey,
        borderBottomWidth: 0.5,
        marginBottom: scaling.moderateScale(25),
        justifyContent: 'center'
    },
    sendButton: {
        position: 'absolute',
        right: 0,
        height: scaling.moderateScale(18),
        width: scaling.moderateScale(18),
    },
    staticText: {
        fontSize: scaling.moderateScale(12),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        color: colour.grey,
        marginBottom: scaling.moderateScale(7),
    },
    contentText: {
        fontSize: scaling.moderateScale(14),
        fontFamily: 'Avenir-Book',
        fontWeight: '400',
        color: colour.darkGrey,
        marginBottom: scaling.moderateScale(15),
    },
    bottomComponent: {
        flex: -1,
        height: height * 0.15,
        padding: width * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButton: {
        backgroundColor: colour.white,
        borderColor: colour.red,
        borderWidth: 1,
        width: width * 0.9,
        height: width * 0.15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signOutText: {
        fontSize: scaling.moderateScale(12),
        fontFamily: 'Avenir-Heavy',
        fontWeight: '500',
        color: colour.red,
    }
}

export default styles;