import Vue from 'vue'

import * as types from "@/store/mutation-types";
import UserBookmarkService from '@/services/UserBookmarkService'

const state = {
    counterParties: [],
    counterGroups: []
};

const getters = {
};

const mutations = {

};

const actions = {
  /**
   * 
   * @param {*} payload { queryModel { count, page } }
   */
    // Getting Counter Parties
 
  
    // Adding Mark A Delivery Point On Delivery Points Screen For Clients
    async addDeliveryPointBookmark (context, payload) {
   
        await UserBookmarkService.addDeliveryPointBookmark(payload).then(res => {
            return res.data;
        }).catch(error => {
            Vue.toasted.error(error.statusText || error);
        });
    },

    // Destroying Mark A Delivery Point On Delivery Points Screen For Clients
    async destroyDeliveryPointBookmark (context, payload) {
        
        await UserBookmarkService.destroyDeliveryPointBookmark(payload).then(res => {
            return res.data;
        }).catch(error => {
            Vue.toasted.error(error.statusText || error);
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
