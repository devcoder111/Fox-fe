import BrokerMarketService from '@/services/BrokerMarketService.js';
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const BrokerMarket = new BrokerMarketService();

const state = {
  brokerMarkets: []
};

const getters = {
  brokerMarkets: state => state.brokerMarkets,
};

const mutations = {
};

const actions = {
  getAllBrokerMarkets: ({ commit }, payload) => {
    return BrokerMarket.getAllBrokerMarkets(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addBrokerMarket: ({ commit }, payload) => {
    return BrokerMarket.addBrokerMarket(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateBrokerMarket: ({ commit }, payload) => {
    return BrokerMarket.updateBrokerMarket(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteBrokerMarkets: ({ commit }, payload) => {
    return BrokerMarket.deleteBrokerMarkets(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
