import ClauseService from '@/services/ClauseService.js';
import {
} from "../mutation-types";

const Clause = new ClauseService();

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  getBrokerageClauses: ({ commit }) => {
    return Clause.getBrokerageClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addBrokerageClause: ({ commit }, payload) => {
    return Clause.addBrokerageClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getPaymentClauses: ({ commit }) => {
    return Clause.getPaymentClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addPaymentClause: ({ commit }, payload) => {
    return Clause.addPaymentClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getQuantityClauses: ({ commit }) => {
    return Clause.getQuantityClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addQuantityClause: ({ commit }, payload) => {
    return Clause.addQuantityClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getRuleClauses: ({ commit }) => {
    return Clause.getRuleClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addRuleClause: ({ commit }, payload) => {
    return Clause.addRuleClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getStorageClauses: ({ commit }) => {
    return Clause.getStorageClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addStorageClause: ({ commit }, payload) => {
    return Clause.addStorageClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getWeightClauses: ({ commit }) => {
    return Clause.getWeightClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addWeightClause: ({ commit }, payload) => {
    return Clause.addWeightClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getFreightClauses: ({ commit }) => {
    return Clause.getFreightClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addFreightClause: ({ commit }, payload) => {
    return Clause.addFreightClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getInsuranceClauses: ({ commit }) => {
    return Clause.getInsuranceClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addInsuranceClause: ({ commit }, payload) => {
    return Clause.addInsuranceClause(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  getPriceClauses: ({ commit }) => {
    return Clause.getPriceClauses().then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  addPriceClause: ({ commit }, payload) => {
    return Clause.addPriceClause(payload).then(res => {
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
