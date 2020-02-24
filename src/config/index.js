export const url = '';

const production = {
    version: {
        android: '1.2.7',
        ios: '1.2.7',
    },
    url: 'https://api.freshbox.id/',
    env: 'production'
}

const staging = {
    version: {
        android: '1.2.6-staging',
        ios: '1.2.6-staging',
    },
    url: 'http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/',
    env: 'staging'
}

const config = production;

export default config;