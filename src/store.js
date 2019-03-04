import Vue from 'vue'
import Vuex from 'vuex'

const KEY_USERINFO = 'KEY_USERINFO';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null
	},
	getters: { //like computed
		user(state) {
			if (!state.user) {
				state.user = JSON.parse(localStorage.getItem(KEY_USERINFO));
			}
			return state.user
		}
	},
	mutations: { //like methods
		setUser(state, playload) {
			state.user = playload
			localStorage.setItem(KEY_USERINFO, JSON.stringify(playload))
		}
	},
	actions: { // like aysnc methods

	}
})
