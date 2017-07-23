<template></template>
<script>

    export default {
        props: {
            path: {
                type: String,
                required: true
            },
            data: {
                type: [String, Object, Number, Function]
            },
            once: {
                type: Boolean,
                required: false,
                value: false
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            fetchData () {
                this.$firebase.database().ref(this.path)[this.once ? 'once' : 'on']('value', (snapshot) => {
                    if (typeof this.data === 'function') {
                        this.data(snapshot)
                    }
                    else {
                        this.data = snapshot
                    }
                })
            }
        },
        watch: {
            path () {
                this.fetchData()
            }
        }
    }

</script>