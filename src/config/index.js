export const url = '';

const production = {
    version: {
        android: '1.0.2',
        ios: '1.0.2',
    },
    url: 'https://api.freshbox.id/',
    env: 'production'
}

const staging = {
    version: {
        android: '1.0.10-staging',
        ios: '1.0.10-staging',
    },
    url: 'http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/',
    env: 'staging'
}

const config = staging;

export default config;