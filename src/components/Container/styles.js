import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
const { height } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1
    },
    contentContainer: (x) => {
        if(x){
            return {
                flex: 1,
            }
        }
        else {
            return {
                flex: 1,
                backgroundColor: colour.white
            }
        }
    },
    backgroundBottom: (bgColor) => ({
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colour[bgColor] ? colour[bgColor] : '#FFFFFF'
    }),
    backgroundTop: (bgColor) => ({
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 250,
        backgroundColor: colour[bgColor] ? colour[bgColor] : '#FFFFFF'
    })
}

export default styles;