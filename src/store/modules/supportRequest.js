import SupportRequestService from '@/services/SupportRequestService.js';
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const SupportRequest = new SupportRequestService();

const state = {
  supportRequests: []
};

const getters = {
  supportRequests: state => state.supportRequests,
};

const mutations = {
};

const actions = {
  getGrowerSupportRequest: ({ commit }, payload) => {
    return SupportRequest.getGrowerSupportRequest(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getSupportRequestList: ({ commit }) => {
    let payload = {
      Count: 999,
      Page: 1
    }
    return SupportRequest.getSupportRequestList(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addSupportRequest: ({ commit }, payload) => {
    return SupportRequest.addSupportRequest(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteSupportRequest: ({ commit }, payload) => {
    return SupportRequest.deleteSupportRequest(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  markAsReadSupportRequest: ({ commit }, payload) => {
    return SupportRequest.markAsReadSupportRequest(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  markAsActionedSupportRequest: ({ commit }, payload) => {
    return SupportRequest.markAsActionedSupportRequest(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  markAsRejectedSupportRequest: ({ commit }, payload) => {
    return SupportRequest.markAsRejectedSupportRequest(payload).then(res => {
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
