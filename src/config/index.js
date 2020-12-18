export const url = "";

const production = {
  version: {
    android: "2.1.0",
    ios: "2.1.0",
  },
  // url: "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/",
  url: "https://api.freshbox.id/",
  env: "production",
};

const staging = {
  version: {
    android: "2.0.0-staging",
    ios: "2.0.0-staging",
  },
  url: "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/",
  env: "staging",
};

const config = production;

export default config;
