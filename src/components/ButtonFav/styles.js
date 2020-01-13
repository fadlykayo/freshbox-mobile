import { scaling } from '@helpers';

const styles = {
    container: (dashboard) => ({
        marginBottom: scaling.moderateScale(15),
        marginLeft: dashboard ? scaling.moderateScale(5) : scaling.moderateScale(8),
    }),
    icon:(dashboard) => ({
        height: dashboard ? scaling.moderateScale(16) : scaling.moderateScale(16),
        width: dashboard ? scaling.moderateScale(18) : scaling.moderateScale(18),
        paddingTop: dashboard ?  null : 50,
        marginTop: scaling.moderateScale(5),
        marginRight: scaling.moderateScale(4)
    })
}

export default styles;