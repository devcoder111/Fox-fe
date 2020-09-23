import * as types from "@/store/mutation-types";
import GrowerService from '@/services/GrowerService'

const state = {
    farmAccessSetting: {},
};

const getters = {
    getFarmAccessSettingData: state => { return state.farmAccessSetting },
};

const mutations = {

};

const actions = {
  /**
   * 
   * @param {*} payload { queryModel { count, page } }
   */
    // Getting Counter Parties

    async growerRegistration (context, payload) {
        context.commit({type: types.START_LOADING}, {root: true});
        await GrowerService.growerRegistration(payload).then(res => {
            context.commit({type: types.STOP_LOADING}, {root: true});

        }).catch(error => {
            this.$toasted.error(error.message || error);
        });
    },
    
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
