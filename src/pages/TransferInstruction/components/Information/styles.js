import { Dimensions } from 'react-native';
import { colour } from '@styles'
import { scaling } from '@helpers';

const { height, width } = Dimensions.get('window')

const styles = {
    middle: {
        place: {
            flex: -1,
            height: height * 0.31,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: width * 0.01,
        },
        each: {
            place: {
                flex: 1,
                width: width * 0.9,

            },
            button: {
                height: height * 0.08,
                borderColor: colour.lightGrey,
                borderWidth: 1,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: width * 0.03,

            },
            innerPlace: {
                top: {
                    flex: -1,
                    height: height * 0.03,
                    justifyContent: 'center',
                },
                bottom: {
                    flex: 1,
                    justifyContent: 'center'
                }
            },
            text: {
                static: {
                    fontFamily: 'Avenir-Black',
                    fontSize: scaling.moderateScale(14),
                    color: colour.darkGrey
                },
                price: {
                    fontFamily: 'Avenir-Black',
                    fontSize: scaling.moderateScale(14),
                    color: colour.red
                }
            }
        },
    },
    icon:{
        bank:{
            height: scaling.moderateScale(25),
            width: scaling.moderateScale(65),
            marginRight: scaling.moderateScale(5)
        },
        copy: {
            position: 'absolute',
            right: 0,
            marginRight: width * 0.05,
            height: scaling.moderateScale(20),
            width: scaling.moderateScale(20),
        }
    }
}

export default styles;