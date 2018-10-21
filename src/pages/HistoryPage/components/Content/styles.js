import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
	transactionName: {
		fontFamily: 'Avenir-Black',
		fontWeight: 'bold',
		color: colour.darkGrey,
		fontSize: scaling.moderateScale(14),
		marginBottom: scaling.moderateScale(2),
	},
	transactionDate: {
		fontFamily: 'Avenir-Medium',
		color: colour.grey,
		fontSize: scaling.moderateScale(11),
		marginBottom: scaling.moderateScale(2),
	},
	transactionPrice: {
		fontFamily: 'Avenir-Black',
		fontWeight: 'bold',
		color: colour.darkGrey,
		fontSize: scaling.moderateScale(16),
		marginBottom: scaling.moderateScale(2),
	},
}

export default styles;