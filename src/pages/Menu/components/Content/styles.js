import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 2,
        alignItems: 'center',
    },
    logo:{
        width: width * 0.5,
    }
}

export default styles;