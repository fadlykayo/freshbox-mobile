import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    background:{
        flex: 1,
        width: width * 0.9,
        justifyContent: 'center',
    },

}

export default styles;