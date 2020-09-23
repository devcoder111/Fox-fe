import {
  START_LOADING,
  STOP_LOADING,
  USER_GET_ALL_COMPANIES,
  USER_GET_COMPANY_DETAIL,
  USER_ADD_NEW_COMPANY,
  USER_DELETE_COMPANY,
  USER_UPDATE_COMPANY,
} from "@/store/mutation-types";
import CompanyService from '@/services/CompanyService';
import Vue from 'vue'

const state = {
  companies: [],
  selectedCompany: {}
};

const getters = {
  getAllCompanyData: state => state.companies,
};

const mutations = {
  [USER_GET_ALL_COMPANIES]: (state, payload) => {
    state.companies = payload;
  },
  [USER_GET_COMPANY_DETAIL]: (state, payload) => {
    state.selectedCompany = Object.assign({}, payload);
  },
  [USER_ADD_NEW_COMPANY]: (state, payload) => {
    state.companies.push(payload);
  },
  [USER_DELETE_COMPANY]: (state, payload) => {
    let index = -1; 
    for (let i = 0; i < state.companies.length; i ++) {
      if (state.companies[i].id == payload.id) {
        index = i;
      }
    }
    state.companies.splice(index, 1);
  },
  [USER_UPDATE_COMPANY]: (state, payload) => {
    let index = -1; 
    for (let i = 0; i < state.companies.length; i ++) {
      if (state.companies[i].id == payload.id) {
        state.companies[i] = Object.assign({}, payload);
      }
    }
  },
};

const actions = {
  getAllCompanies(context, payload) {
    context.commit({ type: START_LOADING }, { root: true });
    return CompanyService.getAllCompanies(payload).then(res => {
      context.commit(USER_GET_ALL_COMPANIES, res.data);
      context.commit({ type: STOP_LOADING }, { root: true });
      return res;
    }).catch(err => {
      Vue.toasted.error(err.statusText || err);
      context.commit({ type: STOP_LOADING }, { root: true });
      throw err;
    });
  },
  getCompanyDetail: ({ commit }, payload) => {
    return CompanyService.getCompanyDetail(payload).then(res => {
      commit(USER_GET_COMPANY_DETAIL, res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteCompany: ({ commit }, payload) => {
    return CompanyService.deleteCompany(payload).then(res => {
      commit(USER_DELETE_COMPANY);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateCompany: ({ commit }, payload) => {
    return CompanyService.updateCompany(payload).then(res => {
      commit(USER_UPDATE_COMPANY, res);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addCompany: ({ commit }, payload) => {
    return CompanyService.addCompany(payload).then(res => {
      commit(USER_ADD_NEW_COMPANY, res);
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
