import { colour } from '@styles';
import { scaling } from '@helpers';

const styles = {
    container: (dashboard) => ({
		flex: 1,
		// marginHorizontal: 10,
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
		noPromo: (dashboard) => ({
			marginTop: dashboard ? 36 : 15
		}),
		price:{
			promo: (dashboard) => ({
				fontFamily: 'Avenir-Roman',
				fontSize: scaling.isIphone5s() ? scaling.moderateScale(11) : scaling.moderateScale(12),
				color: colour.darkerGrey,
				textDecorationLine: 'line-through',

				marginTop: dashboard ? 20 : 5,
				
			}),
			normal: (on_promo, haveLimit) => ({
				fontFamily: 'Avenir-Heavy',
				fontSize: scaling.isIphone5s() ? scaling.moderateScale(13) : scaling.moderateScale(14),
				color: colour.darkGrey,
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