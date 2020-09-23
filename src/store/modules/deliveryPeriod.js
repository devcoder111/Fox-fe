import DeliveryPeriodService from "@/services/DeliveryPeriodService.js";
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const DeliveryPeriod = new DeliveryPeriodService();

const state = {
  deliveryPeriods: [],
};

const getters = {
};

const mutations = {
};

const actions = {
  getAllDeliveryPeriods: ({ commit }, payload) => {
    return DeliveryPeriod.getAllDeliveryPeriods(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getPublicDeliveryPeriods: ({ commit }, payload) => {
    return DeliveryPeriod.getPublicDeliveryPeriods(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addDeliveryPeriod: ({ commit }, payload) => {
    return DeliveryPeriod.addDeliveryPeriod(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateDeliveryPeriod: ({ commit }, payload) => {
    return DeliveryPeriod.updateDeliveryPeriod(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  publishDeliveryPeriod: ({ commit }, payload) => {
    return DeliveryPeriod.publishDeliveryPeriod(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  unpublishDeliveryPeriod: ({ commit }, payload) => {
    return DeliveryPeriod.unpublishDeliveryPeriod(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteDeliveryPeriod: ({ commit }, payload) => {
    return DeliveryPeriod.deleteDeliveryPeriod(payload).then(res => {
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
