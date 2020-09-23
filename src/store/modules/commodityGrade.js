import CommodityGradeService from '@/services/CommodityGradeService.js';
import {
  START_LOADING,
  STOP_LOADING,
  USER_GET_ALL_COMMODITYGRADES,
  ADMIN_ADD_NEW_COMMODITYGRADE,
} from "../mutation-types";

const CommodityGrade = new CommodityGradeService();

const state = {
  commodityGrades: [],
};

const getters = {
  commodityGrades: state => state.commodityGrades,
};

const mutations = {
  [USER_GET_ALL_COMMODITYGRADES]: (state, payload) => {
    state.commodityGrades = Object.assign([], payload);
  },
};

const actions = {
  getAllCommodityGrades: ({ commit }, payload) => {
    return CommodityGrade.getAllCommodityGrades(payload).then(res => {
      commit(USER_GET_ALL_COMMODITYGRADES, res.data);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getGradesByCommodity: ({ commit }, payload) => {
    return CommodityGrade.getGradesByCommodity(payload).then(res => {
      console.log("ADMIN_GRADES_BY_COMMODITY", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.addCommodityGrade(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.updateCommodityGrade(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  publishCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.publishCommodityGrade(payload).then(res => {
      console.log("ADMIN_PUBLISH_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  unpublishCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.unpublishCommodityGrade(payload).then(res => {
      console.log("ADMIN_UNPUBLISH_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  setPrimaryCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.setPrimaryCommodityGrade(payload).then(res => {
      console.log("ADMIN_SET_PRIMARY_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  unsetPrimaryCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.unsetPrimaryCommodityGrade(payload).then(res => {
      console.log("ADMIN_UNSET_PRIMARY_COMMODITYGRADE", res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteCommodityGrade: ({ commit }, payload) => {
    return CommodityGrade.deleteCommodityGrade(payload).then(res => {
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
