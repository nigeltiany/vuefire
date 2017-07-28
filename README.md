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
methods: {
  this.$firebase.specialFirebaseAction('params')
}
```

#### Apply mixins to vuex global namespace
```js
Vue.use(VueFire, {
  project: {
    // ...
  },
  vuex: {
    store: store
  },
  mixins: [
      {
          vuex: true,
          sources: [
              function globalVuexAction({ firebase, database, commit }) {
                    console.log('citizen of the world!')
                    commit('mutationInTheGlobalNameSpace')
              }, //... other functions
          ]
      }
  ]
})

// in components
methods: {
  ...mapActions([
    'globalVuexAction'
  ])
},
mounted () {
  this.globalVuexAction();
  // Or ..
  this.$firebase.globalVuexAction()
}
```

#### Apply some mixins to a namespace
```js
// File with custom helper
export function customNameSpacedVuexFirebaseMixin ({firebase, database, commit}) {
  // What will you create ?
  // return firebase().auth.currentUser
  // database().ref('users/).// some custom functionality
  commit('someMutation')
}
```
```js
// import above file
import customGlobalHelper from 'helperFile'
Vue.use(VueFire, {
  project: {
    // ...
  },
  vuex: {
    namespace: 'main_namespace',
    store: store
  },
  mixins: [
      {
          vuex: true,
          namespace: 'different_namespace',
          sources: [customGlobalHelper]
      },
      {
          vuex: true,
          sources: [
              function inTheMainNameSpace() {
                
              }
          ]
      }
  ]
})

// in components
methods: {
  ...mapActions('different_namespace', [
    'customNameSpacedVuexFirebaseMixin',
  ]),
  ...mapActions('main_namespace', [
    'inTheMainNameSpace',
  ])
}
```

#### Helper Mixins
* [Email Auth](https://github.com/nigeltiany/email-auth) - Mixins that makes authentication through email easier in the Vue/Vuex Context