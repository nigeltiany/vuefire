[Firebase](https://firebase.google.com/docs/web/setup) for [VueJS](https://vuejs.org/)

## Install

```bash
npm install @vuefire/vuefire --save
```

## Usage
#### Configuration
```js
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

### Using Mixins
#### Apply mixins to firebase
```js
Vue.use(VueFire, {
  project: {
    // ...
  },
  mixins: [
      function specialFirebaseAction({firebase}, params){
        // What will you create ?
        console.log(params + ' I see you')
        return firebase.auth().currentUser
      }
  ]
})

// in components
computed: {
  user() {
    this.$firebase.specialFirebaseAction('params')
  }
}
```

#### Supply vuex actions a second parameter that is firebase
```js
import VueFire from '@vuefire/vuefire'

Vue.use(VueFire, {
  project: {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    projectId: '<PROJECT_ID>',
  },
  vuex: {
    namespaces: ['firebase'],
    store: store
  }
})
```
```js
// firebase namespaced module
export default {
  namespaced: true,
  /**
    * ...your state, getter, and mutations are here
    */  
  actions: {
    // and now the magic
    saveToFirebase ({commit, rootState, state}, {firebase, database}, payload) {
      // firebase.database() or just
      database().ref('a/path/on/firebase'). // you know the rest
    }
  }
}
```
```js
// just add 'root' to namespaces array to have your root action have a firebase parameter
vuex: {
  namespaces: ['root', 'firebase'],
  store: store
}
```
```text
firebase components coming soon
- [ ] firebase-app
- [ ] firebase-auth
- [x] firebase-document 
- [ ] firebase-messaging
- [ ] firebase-query
- [ ] firebase-storage
```