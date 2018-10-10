import { Dimensions } from 'react-native';
import { colour } from '@styles'

const { width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        backgroundColor: colour.veryLightGrey,
    },
    content: {
        flex: 1,
        marginTop: width * 0.015,
        marginBottom: width* 0.01,
        backgroundColor: colour.white,
    },
}

export default styles;