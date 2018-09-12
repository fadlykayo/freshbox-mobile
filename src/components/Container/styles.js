import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'ios' ? height == 812 ? 40 : 20 : 0,
    },
}

export default styles;