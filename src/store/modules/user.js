import UserService from '@/services/UserService.js';
import {
  START_LOADING,
  STOP_LOADING,
} from "../mutation-types";

const User = new UserService();

const state = {
  users: [],
  profile: []
};

const getters = {
  users: state => state.users,
  getProfileData: state => {return state.profile}
};

const mutations = {
  [ "GET_USER_PROFILE" ]: (state, payload) => {
    state.profile = payload;
  },

};

const actions = {
  getUserList: ({ commit }) => {
    let payload = {
      count: 999,
      page: 1
    }
    return User.getUserList(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  async getProfileInfo (context) {

    context.commit({type: START_LOADING}, {root: true});
    try {

        let res = await User.getProfileInfo();
        context.commit("GET_USER_PROFILE", res.data);
    } catch (error) {
        this.toasted.error(error.message || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});

  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
