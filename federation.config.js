const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'host-app',

  remotes: {
    glucose: 'https://sakheem.github.io/glucose-app/remoteEntry.json',
    cholesterol: 'https://mogada7281.github.io/cholesterol/remoteEntry.json',
    mood: 'https://stacey-gao.github.io/moodapp/remoteEntry.json',
    sleep: 'https://krobinson03.github.io/sleep-tracker/remoteEntry.json',
    heart: 'https://sabairfan14.github.io/my-app/remoteEntry.json',
  },


  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
});
