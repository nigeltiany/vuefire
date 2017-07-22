[Firebase](https://firebase.google.com/docs/web/setup) for vuejs

## Install

``` bash
npm install @vuefire/vuefire --save
```

## Usage
#### Configuration
``` js
import VueFire from '@vuefire/vuefire'

Vue.use(VueFire, {
  project: {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    projectId: '<PROJECT_ID>',
  }
})

// In components
methods: {
    this.$firebase.database().ref('/users')
    this.$firebase.auth()
}
```
