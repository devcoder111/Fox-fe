import * as types from "@/store/mutation-types";
import TradeService from '@/services/TradeService'
import Vue from 'vue'

const state = {
    orders: [],
    recentAllTrade: [],
    orderDetail: {}
};

const getters = {
    getOrderListData: state => { return state.orders },
    getTradeRecentAllOrderData: state => { return state.recentAllTrade },
    getOrderDetail: state => { return state.orderDetail }
};

const mutations = {

  [ types.GET_ALL_ORDER ]: (state, payload) => {
    state.orders = payload;
  },

  [ types.GET_TRADER_ALL_RECENT_ORDER ]: (state, payload) => {
    state.recentAllTrade = payload;
  },

  [ "GET_SINGLE_ORDER_DETAIL" ]: (state, payload) => {
    state.orderDetail = payload;
  },
 
};

const actions = {
  /**
   * 
   * @param {*} payload { queryModel { count, page } }
   */
    // Getting Counter Parties
    
    async getOrderList (context, payload) {

        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.getOrderList(payload);
            context.commit(types.GET_ALL_ORDER, res.data);

        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});
        
    },
    
    async getTraderSingleOrderDetail (context, id) {
        
        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.getTraderSingleOrderDetail(id);
            context.commit("GET_SINGLE_ORDER_DETAIL", res.data);
        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});
        
    },
    
    async cancelOneTrade (context, payload) {
        
        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.cancelOneTrade(payload);
            context.commit(types.CANCEL_TRADER_ONE_RECENT_ORDER, payload.id);
    
        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});
    },
    
    async cancelAllRecentOrderTrade ( context ) {
        
        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.cancelAllRecentOrderTrade();
            context.commit(types.CANCEL_TRADER_ALL_RECENT_ORDER);
    
        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});
        
    },
    
    
    async reIssueTrader (context, payload) {
        
        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.reIssueTrader(payload);
            
        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});
    },
    
    async activeTrade(context, id) {
        context.commit({type: types.START_LOADING}, {root: true});
        try {
    
            let res = await TradeService.activeTrade(id);
            
        } catch (error) {
            Vue.toasted.error(error.message || error);
        }
        context.commit({type: types.STOP_LOADING}, {root: true});

    }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
