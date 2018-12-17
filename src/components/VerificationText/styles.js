import { scaling } from '@helpers';
import { colour } from '@styles';

const styles = {
    verificationText:{
        fontFamily: 'Avenir-Roman',
        fontSize: scaling.moderateScale(14),
        color: colour.red,
        marginBottom: scaling.moderateScale(5),
        fontStyle: 'italic',
    },
}

export default styles;