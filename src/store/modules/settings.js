import SettingService from '@/services/SettingService.js';
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const Settings = new SettingService();

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  //settings
  getSettings: ({ commit }) => {
    return Settings.getSettings()
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  setSettings: ({ commit }, payload) => {
    return Settings.setSettings(payload)
    .then(res => {
      return res.data;
    }).catch(err => {
      throw err;
    });
  },

  //Trading Hours
  getTradingHours: ({ commit }) => {
    return Settings.getTradingHours()
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getWeeklyTradingHours: ({ commit }) => {
    return Settings.getWeeklyTradingHours()
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  setWeeklyTradingHours: ({ commit }, payload) => {
    return Settings.setWeeklyTradingHours(payload)
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  // notification
  getNotifications: ({ commit }) => {
    return Settings.getNotifications()
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateNotifications: ({ commit }, payload) => {
    commit(START_LOADING, {root: true});
    return Settings.updateNotifications(payload)
    .then(res => {
      commit(STOP_LOADING, {root: true});
      return res;
    }).catch(err => {
      commit(STOP_LOADING, {root: true});
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
