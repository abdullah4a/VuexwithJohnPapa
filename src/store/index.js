import Vue from 'vue'
import Vuex from 'vuex'
import { dataService } from "../shared"
import {
    Get_Heroes,
    Add_Hero,
    Delete_Hero,
    Update_Hero
} from "./mutation-type"

Vue.use(Vuex)
const state = { heroes: [] };
const mutations = {
    [Get_Heroes](state, heroes) {
        state.heroes = heroes
    },
    [Add_Hero](state, hero) {
        state.heroes.push(hero)
    },
    [Delete_Hero](state, hero) {
        state.heroes = {...state.heroes.filter(h => h.id !== hero.id) }
    },
    [Update_Hero](state, hero) {
        const index = state.heroes.findIndex(h => h.id === hero.id)
        state.heroes.splice(index, 1, hero)
        state.heroes = [...state.heroes]
    }
};
const actions = {
    async getheroesAction({ commit }) {
        const heroes = await dataService.getHeroes();
        commit(Get_Heroes, heroes)
    },
    async AddheroAction({ commit }, hero) {
        const addedhero = await dataService.deleteHero(hero)
        commit(Delete_Hero, addedhero);
    },
    async DeleteHeroAction({ commit }, hero) {
        const deletedhero = await dataService.deleteHero(hero)
        commit(Delete_Hero, deletedhero)
    },
    async UpdateHeroAction({ commit }, hero) {
        const updatedHero = await dataService.updateHero(hero);
        commit(Update_Hero, updatedHero)
    }
};
const getters = {
    getHeroesbyID: state => id => state.heroes.find(h => h.id === id)
};



export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations,
    actions,
    getters
})