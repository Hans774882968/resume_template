import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showingTab: 0,
    showEditBody: false
  },
  mutations: {
    changeShowingTab (state, idx) {
      state.showingTab = idx
    },
    changeShowEditBody (state) {
      state.showEditBody = !state.showEditBody
    }
  }
})
