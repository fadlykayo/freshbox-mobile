import { Dimensions } from 'react-native';
import { colour } from '@styles';

const { width } = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
    },
    subcontainer: {
        flex: -1,

    },
    outerContainer: {
        width: width,
        flex: 1,
        flexDirection: 'column',
    },
    radioContainer: {
        width: width,
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    radioOuter: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colour.red,
    },
    radioInner: (status) => ({
        height: 12,
        width: 12,
        borderRadius: 5,
        backgroundColor: status ? colour.red  : 'white'
    })
}

export default styles;