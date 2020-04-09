import { scaling } from '@helpers';
import { colour } from '@styles';

const styles = {
    container: (x,y) => ({
        height: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        // borderBottomColor: colour.red,
        // borderBottomWidth: (x == y) ? 0 : 1,
    }),
    text:{
        fontFamily: 'Avenir-Heavy',
        fontSize: scaling.moderateScale(14),
        color: colour.darkGrey
    }
}

export default styles;