import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
        height: height,
        backgroundColor: colour.darkGreyTransparent,
    },
    container: {
        width: width,
        minHeight: height * 0.6,
        borderRadius: 8,
        backgroundColor: colour.white,
        paddingLeft: width* 0.05,
        paddingRight: width* 0.05,
    },
    topComponent: {
        flex: -1,
        justifyContent: 'space-between',
        height: height * 0.08,
    },
    scrollDownButton: {
        alignItems: 'center',
    },
    middleComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scaling.moderateScale(15),
    },
    staticText: {
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(20),
        fontWeight: '800',
        color: colour.darkGrey,
    },
    scrollView: {
        marginTop: scaling.moderateScale(9),
    },
    logo: {
        height: scaling.moderateScale(45),
        width: scaling.moderateScale(45),
        marginBottom: scaling.moderateScale(5),
    },
    borderImage: {
        height: width * 0.25,
        width: width * 0.25,
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
    favoriteLogo: {
		height: scaling.moderateScale(20),
		width: scaling.moderateScale(20),
    },
    favoriteComponent: {
		flex: 1.5,
		alignItems: 'flex-end',
		height: scaling.moderateScale(100),
    },
    textDescription: {
        fontFamily: 'Avenir-Roman',
        fontWeight: '400',
        textAlign: 'justify',
        color: colour.grey,
        lineHeight: scaling.moderateScale(24),
        marginBottom: scaling.moderateScale(18),
    },
    addNewItem: {
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(70),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.white,
		backgroundColor: colour.red,
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	touchableItem: {
		flexDirection: 'row',
		height: scaling.moderateScale(30),
		width: scaling.moderateScale(70),
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colour.lightGrey,
		backgroundColor: colour.white,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: scaling.moderateScale(10),
		paddingRight: scaling.moderateScale(10),
	},
	itemText: {
		fontSize: scaling.moderateScale(14),
		color: colour.black
	},
	operatorText: {
		color: colour.red,
		fontWeight: 'bold',
	},
	newItemText: {
		color: colour.white,
		fontWeight: 'bold',
    },
    addButton: {
        alignItems: 'flex-end',
        marginBottom: scaling.moderateScale(10),
    }
}

export default styles;