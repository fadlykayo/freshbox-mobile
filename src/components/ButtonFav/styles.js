import { scaling } from '@helpers';

const styles = {
    container:{
        marginBottom: scaling.moderateScale(15),
    },
    icon:(dashboard) => ({
        height: dashboard ? scaling.moderateScale(13) : scaling.moderateScale(16),
        width: dashboard ? scaling.moderateScale(15) : scaling.moderateScale(18),
    })
}

export default styles;