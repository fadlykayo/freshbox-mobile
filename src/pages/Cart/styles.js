import { Dimensions } from 'react-native';
import { colour } from '@styles';
import { scaling } from '@helpers';

const { width, height } = Dimensions.get('window');

const styles = {
    container:{
      backgroundColor: colour.veryLightGrey,
      flex: 1,
      paddingLeft: width * 0.05,
      paddingRight: width * 0.05,
      paddingTop: width * 0.03,
    },
    cartContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: scaling.moderateScale(100),
      width: width * 0.9,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: colour.white,
      backgroundColor: colour.white,
      marginBottom: scaling.moderateScale(10),
      paddingLeft: width * 0.05,
      paddingRight: width * 0.05,
    },
    imageContainer: {
      flex: 1,
      backgroundColor: 'red',
      height: 90,
      width: 100,
      justifyContent: 'center'
    },
    contentContainer: {
      flex: 1.5,
      backgroundColor: 'blue',
    },
    addContainer: {
      flex: 1,
      backgroundColor: 'green'
    },
    logo: {
      height: scaling.moderateScale(45),
      width: scaling.moderateScale(45),
      left: scaling.moderateScale(20),
    },
}

export default styles;