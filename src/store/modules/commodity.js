import CommodityService from '@/services/CommodityService.js';
import {
  START_LOADING,
  STOP_LOADING,
  USER_GET_ALL_COMMODITIES
} from "../mutation-types";

const Commodity = new CommodityService();

const state = {
  commodities: [],
};

const getters = {
  commodities: state => {return  state.commodities },
};

const mutations = {
  [USER_GET_ALL_COMMODITIES]: (state, payload) => {
    state.commodities = Object.assign([], payload);
  },
};

const actions = {
  
  getAllCommodities: ({ commit }, payload) => {
    
    commit({type: START_LOADING}, {root: true});
    return Commodity.getAllCommodities().then(res => {
      commit(USER_GET_ALL_COMMODITIES, res);
      commit({type: STOP_LOADING}, {root: true})
      return res;
    }).catch(err => {
      throw err;
    });
  },

  filterCommodities: ({ commit }, payload) => {
    commit({type: START_LOADING}, {root: true});
    return Commodity.filterCommodities(payload).then(res => {
      commit(USER_GET_ALL_COMMODITIES, res);
      commit({type: STOP_LOADING}, {root: true})
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getPublicCommodities: ({ commit }, payload) => {
    return Commodity.getPublicCommodities(payload).then(res => {
      commit(USER_GET_ALL_COMMODITIES, res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  newCommodity: ({ commit }, payload) => {
    return Commodity.newCommodity(payload).then(res => {
      console.log("USER_GET_ALL_COMMODITIES", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteCommodity: ({ commit }, payload) => {
    return Commodity.deleteCommodity(payload).then(res => {
      console.log("USER_DELETE_COMMODITY");
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateCommodity: ({ commit }, payload) => {
    return Commodity.updateCommodity(payload).then(res => {
      console.log("USER_PUT_COMMODITY");
      return res;
    }).catch(err => {
      throw err;
    });
  },

  publishCommodity: ({ commit }, payload) => {
    return Commodity.publishCommodity(payload).then(res => {
      console.log("ADMIN_PUBLISH_COMMODITY", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  unpublishCommodity: ({ commit }, payload) => {
    return Commodity.unpublishCommodity(payload).then(res => {
      console.log("ADMIN_UNPUBLISH_COMMODITY", res);
      return res;
    }).catch(err => {
      throw err;
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
