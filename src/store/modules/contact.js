import ContactService from '@/services/ContactService.js';
import {
  START_LOADING,
  STOP_LOADING,
  USER_GET_ALL_CONTACTS,
  USER_ADD_NEW_CONTACT,
  USER_UPDATE_CONTACT,
} from "../mutation-types";

const Contact = new ContactService();

const state = {
  contacts: [],
};

const getters = {
  contacts: state => state.contacts,
};

const mutations = {
  [USER_GET_ALL_CONTACTS]: (state, payload) => {
    state.contacts = Object.assign([], payload.results);
  },
  [USER_ADD_NEW_CONTACT]: (state, payload) => {
    state.contacts.push(payload);
  },
};

const actions = {
  getAllContacts: ({ commit }, payload) => {
    return Contact.getAllContacts(payload).then(res => {
      commit(USER_GET_ALL_CONTACTS, res.data);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  searchContacts: ({ commit }, payload) => {
    return Contact.searchContacts(payload).then(res => {
      commit(USER_GET_ALL_CONTACTS, res.data);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getSellerContacts: ({ commit }, payload) => {
    return Contact.getSellerContacts(payload).then(res => {
      commit(USER_GET_ALL_CONTACTS, res.data);
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addContact: ({ commit }, payload) => {
    return Contact.addContact(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getContactsByCompany: ({ commit }, payload) => {
    return Contact.getContactsByCompany(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  deleteContact: ({ commit }, payload) => {
    return Contact.deleteContact(payload).then(res => {
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
