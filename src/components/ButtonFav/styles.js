import { scaling } from '@helpers';

const styles = {
    addContainer: {
		flex: 1.5,
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		height: scaling.moderateScale(60),
    },
    container:{
        marginBottom: scaling.moderateScale(15),
    },
    icon:{
        height: scaling.moderateScale(16),
        width: scaling.moderateScale(18),
    }
}

export default styles;