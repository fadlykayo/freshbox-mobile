import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    subcontainer: {
        flex: -1,

    },
}

export default styles;