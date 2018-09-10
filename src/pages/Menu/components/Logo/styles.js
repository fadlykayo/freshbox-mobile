import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        minHeight: height * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: width * 0.5,
    }
}

export default styles;