import Vue from 'vue'

import DeliveryPointService from "@/services/DeliveryPointService.js";
import {
  START_LOADING,
  STOP_LOADING,
  USER_GET_ALL_DELIVERYPOINTS,
  GET_ALL_DELIVERYPOINT_SELECTION
} from "../mutation-types";

const DeliveryPoint = new DeliveryPointService();

const state = {
  deliveryPoints: [],
  deliveryPointSelection: []
};

const getters = {
  deliveryPoints: state => state.deliveryPoints,
  getDeliveryPointsSelctionData: state => { return state.deliveryPointSelection }
};

const mutations = {
  [USER_GET_ALL_DELIVERYPOINTS]: (state, payload) => {
    state.deliveryPoints = Object.assign([], payload);
  },

  [ GET_ALL_DELIVERYPOINT_SELECTION ]: (state, payload) => {
    state.deliveryPointSelection = payload;
  },

};

const actions = {
  getAllDeliveryPoints: ({ commit }, payload) => {
    return DeliveryPoint.getAllDeliveryPoints(payload).then(res => {
      commit(USER_GET_ALL_DELIVERYPOINTS, res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getPublicDeliveryPoints: ({ commit }, payload) => {
    return DeliveryPoint.getPublicDeliveryPoints(payload).then(res => {
      commit(USER_GET_ALL_DELIVERYPOINTS, res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.addDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.updateDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  publishDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.publishDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  unpublishDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.unpublishDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.deleteDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  togglePublicVisibilityOfDeliveryPoint: ({ commit }, payload) => {
    return DeliveryPoint.togglePublicVisibilityOfDeliveryPoint(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  async getDeliveryPointSelection (context, payload ) {

    context.commit({type: START_LOADING}, {root: true});
    try {    
        let res = await DeliveryPoint.getDeliveryPointSelection(payload);
        context.commit(GET_ALL_DELIVERYPOINT_SELECTION, res.data);

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
