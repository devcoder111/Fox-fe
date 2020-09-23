import {
  START_LOADING,
  STOP_LOADING,
  GET_FARM_ACCESS_SETTING,
  SET_FARM_ACCESS
} from "@/store/mutation-types";
import FarmAccessService from '@/services/FarmAccessService'
import Vue from 'vue'

const state = {
    farmAccessSetting: {},
};

const getters = {
    getFarmAccessSettingData: state => { return state.farmAccessSetting },
};

const mutations = {
    [ GET_FARM_ACCESS_SETTING ]: (state, payload) => {
        state.farmAccessSetting = payload;
    },

    [ SET_FARM_ACCESS ]: (state, payload) => {
        state.farmAccessSetting = payload;
    },
};

const actions = {
  /**
   * 
   * @param {*} payload { queryModel { count, page } }
   */
    // Getting Counter Parties
    
    async getFarmAccessSetting (context, payload) {

        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await FarmAccessService.getFarmAccessSetting(payload);
            context.commit(GET_FARM_ACCESS_SETTING, res.data);
        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
      },
    
    async setFarmAccess (context, payload ) {
    
        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await FarmAccessService.setFarmAccess(payload);
            context.commit(SET_FARM_ACCESS, res.data);
        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
    },
    
    async updateFarmAccess (context, payload) {

        context.commit({type: START_LOADING}, {root: true});
        try {    
            let res = await FarmAccessService.updateFarmAccess(payload);
            context.commit(SET_FARM_ACCESS, res.data);
        } catch (error) {
        Vue.toasted.error(error.statusText || error);
        }
        context.commit({type: STOP_LOADING}, {root: true});
    }
    
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
