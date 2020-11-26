import { Share } from 'react-native'
import encode64 from './encode'

const onShare = async (data) => {
  let encryptCode = encode64.btoa(data.code)
  const url = `https://freshbox.id/link?code_link=2&code_data=${encryptCode}`;
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

export default onShare