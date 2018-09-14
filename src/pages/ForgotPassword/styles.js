import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    content:{
        flex: 1,
    },
}

export default styles;