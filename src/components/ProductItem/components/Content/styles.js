import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
    container: {
		flex: 1,
		marginHorizontal: 10,
		// backgroundColor: 'blue'
	},
	text:{
		title:{
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.isIphone5s ? scaling.moderateScale(14) : scaling.moderateScale(13),
			color: colour.darkGrey,
		},
		price:{
			promo: {
				fontFamily: 'Avenir-Roman',
				fontSize: scaling.isIphone5s ? scaling.moderateScale(13) : scaling.moderateScale(14),
				color: colour.darkerGrey,
				textDecorationLine: 'line-through',
				// marginTop: 10,
				// borderWidth: 1,
				
			},
			normal: (on_promo) => ({
				fontFamily: 'Avenir-Heavy',
				fontSize: scaling.isIphone5s ? scaling.moderateScale(14) : scaling.moderateScale(13),
				color: colour.darkGrey,
				// borderWidth: 1,
				marginTop: on_promo == 1 ? 10 : 0,
				paddingBottom: on_promo == 1 ? 10 : 0,
			})
		},
		desc:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.isIphone5s ? scaling.moderateScale(12) : scaling.moderateScale(11),
			color: colour.greyDesc,
			// borderWidth: 1,
			height: 20,
			// marginHorizontal: 5,
		}
	}
}

export default styles;