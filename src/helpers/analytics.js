import Analytics from 'appcenter-analytics';

const analysis = {}

analysis.trackEvent = (eventName, payload) => {
  Analytics.trackEvent(eventName, payload)
  .then((res) => {
    console.log('success tracked event', res)
  })
  .catch((err) => {
    console.log('error tracked events', err)
  })
}

export default analysis