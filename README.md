# My Shout App
An app built using Vue JS 2 and Ionic Framework 5.

Its primarily built for the purpose of deploying to the android app store.

However a PWA version of the app is also deployed at www.myshout.ie.


## Technical Elements
The app is a Vue 2 app built using the Vue CLI and then the Ionic Framework 5 packages added to it. The reason it is not built using the Ionic CLI is because at the time of creation (August 2020) the Vue version of Ionic was still in Beta. A fully fledged Ionic Vue release is due soon - once Vue 3 is released.

The app uses tabs to navigate between pages.

How to create an Ionic 5 Vue 2 (Beta) app: https://hovercraft.ie/setting-up-a-basic-ionic-vue-app-beta/

### Also uses
- Vuex for state management,
- Vuelidate for for input validation,
- Firebase for the database persistance,
- Axios for communicating with Firebase via REST API.
- Capacitor Camera Plugin to enable phone camera to be used

### Known Bugs
There is an issue with tabs in this version when using Hashed Router Mode - you get a white screen after logging in. A page refresh fixes this or changing Router Mode to 'History'

### Continuous Deployment
Travis CI is used to deploy the PWA after every successful build of the master branch.

