import { colour } from '@styles';
import { scaling } from '@helpers';

const style = {
  emptyState: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    text: {
      fontFamily: 'Avenir-Roman',
      fontSize: scaling.moderateScale(14),
      color: colour.darkGrey,
      marginTop: 20,
    }
  }
}

export default style;