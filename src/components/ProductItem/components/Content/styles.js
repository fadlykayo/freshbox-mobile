import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
    container: (dashboard) => ({
		flex: 1,
		marginHorizontal: 10,
		// marginTop: 20,
		paddingTop: dashboard ? null : 15,
		// backgroundColor: 'blue'
	}),
	text:{
		title:{
			fontFamily: 'Avenir-Heavy',
			fontSize: scaling.isIphone5s() ? scaling.moderateScale(13) : scaling.moderateScale(14),
			color: colour.darkGrey,
		},
		price:{
			promo: (dashboard) => ({
				fontFamily: 'Avenir-Roman',
				fontSize: scaling.isIphone5s() ? scaling.moderateScale(11) : scaling.moderateScale(12),
				color: colour.darkerGrey,
				textDecorationLine: 'line-through',
				// alignSelf: 'center',
				// paddingTop: 10,
				marginTop: dashboard ? 15 : 5,
				// borderWidth: 1,
				
			}),
			normal: (on_promo) => ({
				fontFamily: 'Avenir-Heavy',
				fontSize: scaling.isIphone5s() ? scaling.moderateScale(13) : scaling.moderateScale(14),
				color: colour.darkGrey,
				// alignSelf: 'center',
				// borderWidth: 1,
				// marginTop: on_promo == 1 ? 5 : 0,
				// paddingBottom: on_promo == 1 ? 10 : 0,
				paddingRight: 2,
			})
		},
		desc:{
			fontFamily: 'Avenir-Roman',
			fontSize: scaling.isIphone5s() ? scaling.moderateScale(11) : scaling.moderateScale(11),
			color: colour.greyDesc,

			// borderWidth: 1,
			// height: 20,
			marginVertical: 2,
		}
	}
}

export default styles;