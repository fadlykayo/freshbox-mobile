import { scaling } from '@helpers';
import { colour } from '@styles';

const styles = {
    container: (x,y) => ({
        height: scaling.moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colour.red,
        borderBottomWidth: (x == y) ? 0 : 1,
    }),
    text:{
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(12),
        color: colour.darkGrey
    }
}

export default styles;