import CircularTradeService from '@/services/CircularTradeService.js';
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const CircularTrade = new CircularTradeService();

const state = {
  event: null
};

const getters = {
};

const mutations = {
};

const actions = {
  getCircularTrades: ({ commit }) => {
    return CircularTrade.getCircularTrades().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addCircularTrades: ({ commit }, payload) => {
    return CircularTrade.addCircularTrades(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  searchCircularTrades: ({ commit }, payload) => {
    return CircularTrade.searchCircularTrades(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  exportCircularTrades: ({ commit }, payload) => {
    return CircularTrade.exportCircularTrades(payload).then(res => {
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
