import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from "../shared"
import { Get_Heroes } from "./mutation-type"

Vue.use(Vuex)
const state = { heroes: [] };
const mutations = {
    [Get_Heroes](state, heroes) {
        state.heroes = heroes
    }
};
const actions = {
    async getheroesAction({ commit }) {
        const heroes = await dataService.getHeroes();
        commit(Get_Heroes, heroes)
    }
};
const getters = {
    getHeroesbyID: state => id => state.heroes.find(h => h.id === id)
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})