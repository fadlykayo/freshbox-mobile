import { scaling } from '@helpers';

const styles = {
    container: (dashboard) => ({
        marginBottom: scaling.moderateScale(15),
        marginLeft: dashboard ? scaling.moderateScale(5) : scaling.moderateScale(8),
    }),
    icon:(dashboard) => ({
        height: dashboard ? scaling.moderateScale(13) : scaling.moderateScale(16),
        width: dashboard ? scaling.moderateScale(15) : scaling.moderateScale(18),
        paddingTop: dashboard ? null : 50
    })
}

export default styles;