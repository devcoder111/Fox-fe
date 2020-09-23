import {
  STOP_LOADING,
  START_LOADING,
  SET_TRANSITION_REPORTS,
  SET_INVOICE_REPORTS,
} from "@/store/mutation-types"
import AdviceService from '@/services/AdviceService'
import Vue from 'vue'

const state = {
  transaction: {
    data: [],
    totalPage: 0
  },
  invoice: {
    data: [],
    totalPage: 0
  }
};

const getters = {
};

const mutations = {
  [SET_TRANSITION_REPORTS]: (state, payload) => {
    let { data, pagination } = payload;
    state.transaction.data = data;
    
    if (pagination) {
      state.transaction.totalPage = Math.ceil(
        pagination.total / pagination.count
      );
    }
  },
  [SET_INVOICE_REPORTS]: (state, payload) => {
    let { data, pagination } = payload
    state.invoice.data = data
    
    if (pagination) {
      state.invoice.totalPage = Math.ceil(
        pagination.total / pagination.count
      )
    }
  }
};

const actions = {
  // transactions
  async getAllTransactions(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      let data = await AdviceService.getAllTransactions(payload)
      context.commit(SET_TRANSITION_REPORTS, data)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  getTransactionDetail: ({ commit }, payload) => {
    return AdviceService.getTransactionDetail(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  updateTransaction: ({ commit }, payload) => {
    return AdviceService.updateTransaction(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  async exportTransactionsToPDF(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      await AdviceService.exportTransactionsToPDF(payload)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  exportTransactionToPDF: ({ commit }, payload) => {
    return AdviceService.exportTransactionToPDF(payload).then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
  },

  /**
   * 
   * @param {*} payload { id }
   */
  async deleteTransaction(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      await AdviceService.deleteTransaction(payload)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  async exportTransactionsToExcel(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      await AdviceService.exportTransactionsToExcel(payload)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  // invoices
  async getAllInvoices(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    return AdviceService.getAllInvoices(payload)
      .then(res => {
        context.commit(SET_INVOICE_REPORTS, res);
        context.commit({type: STOP_LOADING}, {root: true});
        return res;
      })
      .catch(error => {
        Vue.toasted.error(error.statusText || error);
        context.commit({type: STOP_LOADING}, {root: true});
        throw error;
      });
  },

  async exportInvoicesToExcel(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      await AdviceService.exportInvoicesToExcel(payload)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  /**
   * 
   * @param {*} payload { invoiceId } }
   */
  async exportInvoiceToPDF(context, payload) {
    context.commit({type: START_LOADING}, {root: true});
    try {
      await AdviceService.exportInvoiceToPDF(payload)
    } catch (error) {
      Vue.toasted.error(error.statusText || error);
    }
    context.commit({type: STOP_LOADING}, {root: true});
  },

  addNewAdvice ({ commit }, payload) {
    commit({type: START_LOADING}, {root: true});
    return AdviceService.addNewAdvice(payload).then(res => {
      commit({type: STOP_LOADING}, {root: true});
      return res;
    }).catch(err => {
      commit({type: STOP_LOADING}, {root: true});
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