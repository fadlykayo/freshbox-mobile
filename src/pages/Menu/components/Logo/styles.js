import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: -1,
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: width * 0.6,
    }
}

export default styles;