import {
  START_LOADING,
  STOP_LOADING,
  GET_ALL_COUNTER_PARTIES,
  ADD_COUNTER_PARTY,
  UPDATE_COUNTER_PARTY,
  GET_ALL_GROUPS,
  ADD_GROUP,
  DELETE_GROUP
} from "@/store/mutation-types";
import CounterPartyService from '@/services/CounterPartyService'
import Vue from 'vue'
const state = {
    counterParties: [],
    counterGroups: []
};

const getters = {
    getCounterParties: state => { return state.counterParties },
    getGroups: state => { return state.counterGroups }
};

const mutations = {
  [ GET_ALL_COUNTER_PARTIES ]: (state, payload) => {
    state.counterParties = payload;
  },
  [ ADD_COUNTER_PARTY ]: (state, payload)  => {
    state.counterParties = [ ...state.counterParties, payload ];
  },

  [ UPDATE_COUNTER_PARTY ]: (state, payload) => {
    Object.assign(state.counterParties.filter(item => item.id == payload.id )[0], payload);
  },

  [ GET_ALL_GROUPS ]: (state, payload) => {
    state.counterGroups = payload;
  },

  [ ADD_GROUP ]: (state, payload) => {
    state.counterGroups = [ ...state.counterGroups, payload ];
  },

  [ DELETE_GROUP ]: (state, payload) => {
    state.counterGroups = state.counterGroups.filter(item => item.id != payload.id );
  },
};

const actions = {
  /**
   * 
   * @param {*} payload { queryModel { count, page } }
   */
    // Getting Counter Parties
    
    async getAllCounterParties (context, filterData) {

        context.commit({type: START_LOADING}, {root: true});
        try {

            let payload = {
                "hasFilter": filterData ? true : false,
                "filters": [
                {
                    "fieldName": "EntityName",
                    "value": filterData,
                    "operator": 3,
                    "tablePrefix": "Company"
                }
                ]
            };
    
            let res = await CounterPartyService.getAllCounterParties(payload);
            context.commit(GET_ALL_COUNTER_PARTIES, res.data);

        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});

    },

    async addCounterParty (context, payload) {
        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await CounterPartyService.addCounterParty(payload);
            context.commit(ADD_COUNTER_PARTY, res.data);

        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
    },

    async updateCounterParty (context, payload) {
        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await CounterPartyService.updateCounterParty(payload);
            context.commit(UPDATE_COUNTER_PARTY, res.data);

        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
        
    },

    async getAllGroups (context, filterData) {

        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await CounterPartyService.getAllGroups(filterData);
            context.commit(GET_ALL_GROUPS, res);

        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});

    },

    async addGroup (context, payload) {
        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await CounterPartyService.addCounterGroup(payload);
            context.commit(ADD_GROUP, res);
        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
    },   
    
    async delGroup (context, payload) {
        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await CounterPartyService.delCounterGroup(payload);
            context.commit(DELETE_GROUP, payload);
        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
    },   

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
