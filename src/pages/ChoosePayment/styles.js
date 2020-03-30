import { Dimensions, Platform } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        // paddingTop: 40,
        backgroundColor: colour.white,
        
    },
    content: (gopay) => {
        if(gopay) {
            if(Platform.OS == 'ios') {
                return (
                    {flex: 1,
                    // backgroundColor: colour.white,
                    alignItems: 'center',
                    justifyContent: 'center',}
                )
            } else {
                return (
                    {
                        flex: 1
                    }
                )
            }

        } else {
            return ({
                flex: 1,
                // backgroundColor: colour.white,
                // alignItems: 'center',
                // justifyContent: 'center',
            })
        }
        
    },
    webview:{
        
    },
    gopay:{
        container: {
            flex: 1,
            // width: width * 0.8,
            // height: height * 0.5,
            // borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContainer: {
            flex: -1,
            paddingLeft: 11,
        },
        image: {
            height: 100,
            width: 180,
        },
        buttonContainer: {
            flex: -1,
            paddingVertical: scaling.moderateScale(10),
            marginBottom: scaling.moderateScale(10),
        },
        pendingContainer: {
            height: 124,
            justifyContent: 'center'
        },
        textContainer: {
            flex: -1,
            // borderWidth: 1
            paddingHorizontal: scaling.moderateScale(30),
        },
        textStatusContainer: {
            flex: -1,
            // borderWidth: 1
            marginBottom: scaling.moderateScale(10)
        },
        text: {
            fontFamily: 'Avenir-Roman',
			fontSize: scaling.moderateScale(16),
			color: colour.darkGrey,
            textAlign: 'center',
        }
    },
}

export default styles;