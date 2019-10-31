import { Share } from 'react-native'

const helper = {}

helper.onShare = async (data) => {
  const url = 'https://frshbox.app.link/downloadnow';
  const product = data.name.split(" ").join("_");
  try {
    const result = await Share.share({
      message: `Beli ${data.name} Ga Pake Repot Hanya Di Freshbox! Klik disini: ${url}`,
    });

    if (result.action == Share.sharedAction) {
      if(result.activityType) {
        // console.warn(result.activityType)
      } else {
        // console.warn(result)
      }
    } else if (result.action === Share.dismissedAction) {
      // console.warn('dismissed')
    }
  } catch (err) {
    // console.warn(err.message)
  }
}