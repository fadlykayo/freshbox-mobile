export const url = '';

const production = {
    version: {
        android: '1.0.0',
        ios: '1.0.0',
    },
    url: 'https://api.freshbox.id/',
}

const staging = {
    version: {
        android: '1.0.0-staging',
        ios: '1.0.0-staging',
    },
    url: 'http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/',
}

const config = staging;

export default config;