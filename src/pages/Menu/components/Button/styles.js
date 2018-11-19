import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        height: scaling.moderateScale(40),
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: (type) => {
        switch(type){
            case 'facebook':
                return ({
                    borderWidth: 1,
                    borderColor: colour.blueFacebook,
                    borderRadius: 8,
                    backgroundColor: colour.blueFacebook,
                    marginBottom: scaling.moderateScale(10),
                })
            case 'email':
                return ({
                    borderWidth: 1,
                    borderColor: colour.darkGrey,
                    borderRadius: 8,
                    backgroundColor: colour.darkGrey,
                    marginBottom: scaling.moderateScale(10),
                })
            case 'google':
                return ({
                    borderWidth: 1,
                    borderColor: colour.white,
                    borderRadius: 8,
                    backgroundColor: colour.white,
                    marginBottom: scaling.moderateScale(10),
                })
            default:
                return ({
                    borderWidth: 1,
                    borderColor: colour.white,
                    borderRadius: 8,
                    backgroundColor: colour.transparentWhite,
                    marginBottom: scaling.moderateScale(25),
                })
        }
    },
    content: (type) => {
        if(type == 'google'){
            return({
                fontFamily: 'Avenir-Black',
                fontSize: scaling.moderateScale(14),
                color: colour.darkGrey,
            })
        } else {
            return({
                fontFamily: 'Avenir-Black',
                fontSize: scaling.moderateScale(14),
                color: colour.white,
            })
        }
    },
    logo:{
        position: 'absolute',
        height: scaling.moderateScale(15),
        width: scaling.moderateScale(15),
        left: scaling.moderateScale(25),
    },
}

export default styles;