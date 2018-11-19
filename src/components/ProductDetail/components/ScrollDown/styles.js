import { Dimensions } from 'react-native';
import { scaling } from '@helpers';

const { height } = Dimensions.get('window');

const styles = {
    subcontainer:{
        top:{
            flex: -1,
            height: height * 0.05,
            alignItems: 'center',
            justifyContent: 'center'
        },
    },
    button:{
        dropdown:{
            alignItems: 'center',
        }
    },
    icon:{
        dropdown:{
            height: scaling.moderateScale(36),
            width: scaling.moderateScale(36),
        },
    },
}

export default styles;