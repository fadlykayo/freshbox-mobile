import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
        paddingTop: width * 0.15,
        minHeight: height * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        width: width * 0.1,
    }
}

export default styles;