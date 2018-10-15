import { Dimensions, Platform } from 'react-native';
import { colour } from '@styles';
const { height } = Dimensions.get('window');

const styles = {
    container:{
        flex: 1,
    },
    containerBackground:{
        flex: 1,
        backgroundColor: colour.white
    },
    contentContainer:{
        flex: 1,
    },
    contentContainerBackground:{
        flex: 1,
        backgroundColor: colour.white
    }
}

export default styles;