import { Share } from 'react-native'
import encode64 from './encode'
import Config from '@config';

let webUrl = ''

if(Config.env == 'production'){
  webUrl = 'https://freshbox.id'
} else if (Config.env == 'staging') {
  // webUrl = 'http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com:3000'
  webUrl = 'localhost:3000'
}

const onShare = async (data) => {
  let encryptCode = encode64.btoa(data.code)
  // const url = `https://freshbox.id/link?code_link=2&code_data=${encryptCode}`;
  const url = `${webUrl}/link?code_link=2&code_data=${encryptCode}&branch_id=${data.branch_id}`
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