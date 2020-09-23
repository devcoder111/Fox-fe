import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import navigation from "./modules/navigation";
import swatch from "./modules/swatch";
import settings from "./modules/settings";
import auth from "./modules/auth";
import clause from "./modules/clause";
import advice from "./modules/advice";

import contact from "./modules/contact";
import commodity from "./modules/commodity";
import commodityGrade from "./modules/commodityGrade";
import deliveryPeriod from "./modules/deliveryPeriod";
import deliveryPoint from "./modules/deliveryPoint";
import supportRequest from "./modules/supportRequest";
import brokerMarket from "./modules/brokerMarket";
import user from "./modules/user";
import circularTrade from "./modules/circularTrade";

import counterParty from "./modules/counterParty";
import farmAccess from "./modules/farmAccess";
import company from "./modules/company";
import userBookmark from "./modules/userBookmark";
import grower from "./modules/grower";
import region from "./modules/region";
import trade from "./modules/trade";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  getters,
  mutations,
  actions,
  namespace: true,
  modules: {
    navigation,
    swatch,
    settings,
    auth,
    commodity,
    commodityGrade,
    deliveryPeriod,
    deliveryPoint,
    supportRequest,
    brokerMarket,
    user,
    circularTrade,
    counterParty,
    userBookmark,
    company,
    contact,
    farmAccess,
    grower,
    region,
    trade,
    clause,
    advice
  }
});
