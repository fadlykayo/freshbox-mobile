import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        // backgroundColor: 'rgb(229,37,70)',
        backgroundColor: '#FFFFFF',
    },
    contentContainer:{
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    }
}

export default styles;