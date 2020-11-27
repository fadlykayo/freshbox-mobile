export const url = "";

const production = {
  version: {
    android: "1.9.2",
    ios: "1.9.1",
  },
  // url: "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/",
  url: "https://api.freshbox.id/",
  env: "production",
};

const staging = {
  version: {
    android: "1.8.2-staging",
    ios: "1.8.2-staging",
  },
  url: "http://ec2-18-236-134-251.us-west-2.compute.amazonaws.com/",
  env: "staging",
};

const config = production;

export default config;
