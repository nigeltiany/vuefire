import Firebase from 'firebase'
import FirebaseDocument from './components/firebase-document.vue'

export default {
    install(Vue, { project, vuex, mixins = [] }) {

        let addInvokedHook = (funktion) => {
            return new Proxy(funktion, {
                apply: function(target, thisArg, argumentsList) {
                    target({ firebase: firebaseApp.firebase, database: firebaseApp.database }, ...argumentsList)
                }
            })
        }

        let addVuexActionInvokedHook = (funktion) => {
            return [new Proxy(funktion, {
                apply: function(target, thisArg, argumentsList) {
                    target({ firebase: firebaseApp.firebase, database: firebaseApp.database }, ...argumentsList)
                }
            })]
        }

        let addMixinFunction = (mixin) => {
            if (Object.getOwnPropertyNames(mixin.prototype).length === 1) {
                Mixins.prototype[mixin.name] = addInvokedHook(mixin.prototype.constructor)
            }
            else {
                Object.getOwnPropertyNames(mixin.prototype).map(method => {
                    if (method !== 'constructor') {
                        Mixins.prototype[method] = addInvokedHook(mixin.prototype[method])
                    }
                })
            }
        }

        vuex.namespaces.map((namespace) => {
            Object.keys(vuex.store._actions).map((actionName) => {
                if (actionName.match(namespace)) {
                    vuex.store._actions[actionName] = addVuexActionInvokedHook(vuex.store._actions[actionName][0])
                }
                if (vuex.namespaces.includes('root') && !actionName.match('/')) {
                    vuex.store._actions[actionName] = addVuexActionInvokedHook(vuex.store._actions[actionName][0])
                }
            })
        })

        mixins.map(mixin => {
            if (typeof mixin === 'object') {
                mixin.sources.map(funktion => {
                    addMixinFunction(funktion)
                })
            }
            else if (typeof mixin === 'function') {
                addMixinFunction(mixin)
            }
        })

        const firebaseApp = new FirebaseApp(project)
        Vue.prototype.$firebase = firebaseApp.firebase
        Vue.prototype.Firebase = Firebase

        Vue.component('firebase-document', FirebaseDocument)

    }
}

class Mixins {}

class FirebaseApp extends Mixins {

    constructor (config) {
        super()
        this.firebase = Firebase.initializeApp(config)
        this.database = Firebase.database
    }

}