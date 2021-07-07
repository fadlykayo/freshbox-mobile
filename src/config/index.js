export const url = '';

const production = {
  version: {
    android: '2.4.3',
    ios: '2.4.3',
  },
  // url: "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/",
  url: 'https://api.freshbox.id/',
  env: 'production',
};

const staging = {
  version: {
    android: '2.4.3-staging',
    ios: '2.4.3-staging',
  },
  url: 'http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/',
  env: 'staging',
};

const config = staging;

export default config;
