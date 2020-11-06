import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');


const styles = {
    container: {
        flex: 1,
    },
    circleContainer: {
        marginTop: 36,
        alignItems: 'center',
    },
    circleBlue: {
        width: 125,
        height: 125,
        borderColor: "#3CD0B8",
        borderRadius: 100,
        borderWidth: 15,
        opacity: 0.25,
        // opacity: 0.5,
        padding: 0,
        marginBottom: 20
    },
    circleBlueDark: {
        width: 95,
        height: 95,
        borderColor: "#3CD0B8",
        borderRadius: 100,
        borderWidth: 15,
        opacity: 0.7,
        alignSelf: 'center',
    },
    imageInCircle: {
        // alignSelf: 'center',
        height: 43,
        width: 43,
        position: 'absolute',
        left: '44.5%',
        top: height <= 640 ? scaling.verticalScale(45) : scaling.verticalScale(40),
        right: 0,
        bottom: 0,
        flex: 1
    },
    cardContainer: {
        // width: width,
        // paddingHorizontal: 20,
        backgroundColor: "#fff",
        elevation: 5,
        margin: 20,
        shadowColor: 'rgba(0.78, 0.79, 0.81, 0.32)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        borderRadius: 10
    },
    orderWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    lineWrapper: {
        marginHorizontal: 20
    },
    line: {
        borderWidth: 1,
        borderColor: '#F4F4F4',
    },
    dateWrapper: {
        padding: 20
    },
    alignText: {
        marginBottom: 15
    },
    iconWrapper: {
        flexDirection: 'row'
    },
    icon: {
        height: 15,
        width: 15,
        marginRight: 10
    },
    buttonToHome: {
        alignItems: 'center',
        borderColor: '#E52546',
        borderWidth: 1,
        margin: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonOrder: {
        alignItems: 'center',
        backgroundColor: '#E52546',
        padding: 10,
        borderRadius: 10,
    },
    button: {
        home: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: '#E52546'
        },
        order: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: '#fff'
        }
    },

    text: {
        thanks: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: '#515151'
        },
        process: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(13),
            color: '#515151'
        },
        order: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: '#515151',
            opacity: 0.5
        },
        date: {
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(14),
            color: '#5B5B5B',
        },
        center: {
            alignItems: 'center'
        }
    }

}

export default styles