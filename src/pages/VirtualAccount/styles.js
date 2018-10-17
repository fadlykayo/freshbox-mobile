import { Dimensions } from 'react-native';
import { scaling } from '@helpers';
import { colour } from '@styles'

const { height, width } = Dimensions.get('window')

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
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
}

export default styles;