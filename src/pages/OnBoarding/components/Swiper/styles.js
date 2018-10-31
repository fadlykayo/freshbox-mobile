import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
    fullScreen: {
        width: width,
        height: height
    },
    container: {
        position: 'relative',
        backgroundColor: 'transparent',
    },
};

export default styles