require('dotenv').config();

const config = require('./app.json');
module.exports = {
  ...config.expo,
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    supabasePublishableKey: process.env.EXPO_PUBLIC_SUPABASE_KEY ?? '',
  },
};
