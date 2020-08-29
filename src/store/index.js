import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

const BIRDS_API = 'http://aves.ninjas.cl/api/birds'


export default new Vuex.Store({
  state: {
    currentUser: getFromStorage('user') || undefined,
    birds: [],
    currentBird: {},
    show: false
  },
  mutations: {
    UPDATE_CURRENTUSER(state, user) {state.currentUser = user, setInStorage('user', user)},
    GET_BIRDS(state, birds){state.birds = birds},
    GET_CURRENTBIRD(state, bird){state.currentBird = bird},
    HIDE_LOADING(state) {
			state.show = false;
		},
		SHOW_LOADING(state) {
			state.show = true;
		},
  },
  actions: {
    updateUser({commit}, user){
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURRENTUSER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    getBirds({commit}){
      commit("SHOW_LOADING");
      axios.get(`${BIRDS_API}`)
      .then(res => {
     console.log(res.data)
     let birds = res.data
     commit('GET_BIRDS', birds)
     commit("HIDE_LOADING");
  })
  .catch(err => {
    console.log(err)
  })
},

getCurrentBird({commit}, birdDetail){
  commit("SHOW_LOADING");
  axios.get(`${birdDetail}`)
  .then(res  => {
    console.log(res.data)
    let currentBird = res.data
    commit('GET_CURRENTBIRD', currentBird)
    commit("HIDE_LOADING");
  })
}
},
  getters: {
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
  },
})
