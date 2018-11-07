import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    container:{
        flex: 1,
    },
    subcontainer:{
        top:{
            flexDirection: 'row',
            height: scaling.moderateScale(50),
            paddingHorizontal: width * 0.05,
            borderBottomColor: colour.lightGrey,
            borderBottomWidth: 1,
            alignItems: 'center'
        },
        bottom:{
            marginTop: scaling.moderateScale(10),
        },
        bank:{
            flex: -1,
            width: scaling.moderateScale(80),
            marginRight: width * 0.05,
        },
        desc:{
            flex: 1,
        },
        instruction:{
            main:{
                flex: -1,
                height: scaling.moderateScale(50),
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: scaling.moderateScale(5),
            },
            left:{
                flex: -1,
                marginRight: width * 0.05,
            },
            right:{
                flex: 1,
            },
        }
    },
    text:{
        bank:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(12),
            color: colour.darkGrey
        },
        index:{
            fontFamily: 'Avenir-Medium',
            fontSize: scaling.moderateScale(12),
            color: colour.red,
        },
        instruction:{
            fontFamily: 'Avenir-Light',
            fontSize: scaling.moderateScale(12),
            color: colour.darkGrey,
            lineHeight: scaling.moderateScale(20)
        },
    },
    icon:{
        bank:{
            height: scaling.moderateScale(30),
            width: scaling.moderateScale(75),
        },
        circle:{
            height: scaling.moderateScale(24),
            width: scaling.moderateScale(24),
            backgroundColor: colour.lightPink,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center'
        },
    },
}

export default styles;