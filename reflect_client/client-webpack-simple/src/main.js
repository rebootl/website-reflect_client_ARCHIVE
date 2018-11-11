import Vue from 'vue'
import App from './App.vue'

export const global_state = {

    selection_data: [],
    user: {
      logged_in: false,
      name: ''
    },
    overlay: {
      shown: false,
      login: false,
      add_topic: false,
      add_subtag: false,
    },
    edit_topic_item: {},
    edit_subtag_item: {},
    flash: {
      shown: false,
      type_msg: "",
      msg: ""
    },
    // (keep for temporary backw. compat)
    flash_msg: "",

}

new Vue({
  el: '#app',
  render: h => h(App)
})
