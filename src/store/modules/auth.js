import AuthService from "@/services/AuthService.js";

const Auth = new AuthService();

const state = {
  user: null
};

const getters = {
  user: state => state.user
};

const mutations = {
  setUser: (state, payload) =>{
    state.user = payload;
  }
};

const actions = {
  signIn: ({ commit }, payload) => {
    return Auth.signIn(payload)
    .then(result => {
      var status;
      if (result.data == null) {
        status = {successful: false, error: result.errors[0].errorMessage}; 
      }
      else {
        var token = result.data.access_token;
        localStorage.setItem("token", token);
        commit("setUser", result.data.user);
        status = {successful: true}
      }
      return status;
    })
    .catch(e => {
      throw e;
    });
  },

  register: ({ commit }, payload) =>{
    return Auth.register(payload)
    .then(result => {
      var status;
      if(result.data) {
        status = {successful: true}
      }
      else {
        status = {successful: false, error: result.errors[0].errorMessage};
      }

      return status;
    })
    .catch(e => {
      console.log(e);
      return e;
    });
  },

  forgotPassword: ({ commit }, payload) => {
    return Auth.forgotPassword(payload).then(res => {
      return res;
    }).catch((err) => {
      throw err;
    });
  },

  resetPassword: ({ commit }, payload) => {
    return Auth.resetPassword(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getCurrent: ({ commit }) => {
    return Auth.getCurrent().then(res => {
      commit("setUser", res);
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
