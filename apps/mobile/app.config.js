const config = require("./app.json");

module.exports = {
  ...config.expo,
  extra: {
    // Expo Router apps can read these via `Constants.expoConfig.extra`.
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
  },
};
