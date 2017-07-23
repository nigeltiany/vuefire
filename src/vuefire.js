import Firebase from 'firebase'
import FirebaseDocument from './components/firebase-document.vue'

export default {
    install(Vue, { project, vuex, mixins = [] }) {

        let addInvokedHook = (funktion) => {
            return new Proxy(funktion, {
                apply: function(target, thisArg, argumentsList) {
                    target({ firebase: firebaseApp, database: firebaseApp.database }, ...argumentsList)
                }
            })
        }

        let addVuexActionInvokedHook = (funktion) => {
            return [new Proxy(funktion, {
                apply: function(target, thisArg, argumentsList) {
                    target(Object.assign({ firebase: firebaseApp, database: firebaseApp.database }, vuex.store), ...argumentsList)
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

        let extendVuex = (namespace, source) => {
            if (Object.getOwnPropertyNames(source.prototype).length === 1) {
                vuex.store._actions[(namespace ? namespace + '/' : '') + source.name] = addVuexActionInvokedHook(source.prototype.constructor)
            }
            else {
                Object.getOwnPropertyNames(source.prototype).map(method => {
                    if (method !== 'constructor') {
                        vuex.store._actions[(namespace ? namespace + '/' : '') + method] = addVuexActionInvokedHook(source.prototype[method])
                    }
                })
            }
        }

        mixins.map(mixin => {
            if (typeof mixin === 'object') {
                if (mixin.vuex === true) {
                    mixin.sources.map(funktion => {
                        extendVuex(mixin.namespace || vuex.namespace, funktion)
                        addMixinFunction(funktion)
                    })
                }
                else {
                    mixin.sources.map(funktion => {
                        addMixinFunction(funktion)
                    })
                }
            }
            else if (typeof mixin === 'function') {
                addMixinFunction(mixin)
            }
        })

        const firebaseApp = new FirebaseApp(project)
        Vue.prototype.$firebase = firebaseApp

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