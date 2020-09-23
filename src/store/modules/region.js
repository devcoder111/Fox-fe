import {
    USER_GET_ALL_REGIONS,
    USER_ADD_NEW_REGION,
    USER_GET_REGION_DETAIL,
    USER_DELETE_REGION,
    USER_UPDATE_REGION
} from "@/store/mutation-types";
import RegionService from '@/services/RegionService'

const state = {
    regions: [],
};

const getters = {
    getRegions: state => state.regions,
};

const mutations = {
    [USER_GET_ALL_REGIONS]: (state, payload) => {
        state.regions = payload;
    },
    
    [USER_ADD_NEW_REGION]: (state, payload) => {
        state.regions = [...state.regions, payload];
    },
    
    [USER_GET_REGION_DETAIL]: (state) => {
        state.event = "";
    },
    
    [USER_DELETE_REGION]: (state, payload) => {
        state.regions = state.regions.filter(item => item.id != payload.id );
    },
    
    [USER_UPDATE_REGION]: (state) => {
        state.event = "";
    },
    
};

const actions = {
    getAllRegions: ({ commit }) => {
        return RegionService.getAllRegions().then(res => {
          commit(USER_GET_ALL_REGIONS, res.data.multipleResults);
          return res.data.multipleResults;
        }).catch(err => {
          throw err;
        });
    },
    
    addNewRegion: ({ commit }, payload) => {
        return RegionService.addNewRegion(payload).then(res => {
            commit(USER_ADD_NEW_REGION, res.data);
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    
    getRegionDetail: ({ commit }, payload) => {
        return RegionService.getRegionDetail(payload).then(res => {
            commit(USER_GET_REGION_DETAIL, res.data);
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    
    deleteRegion: ({ commit }, payload) => {
        return RegionService.deleteRegion(payload).then(res => {
            commit(USER_DELETE_REGION, payload);
            return res.data;
        }).catch(err => {
            throw err;
        });
    },

    updateRegion: ({ commit }, payload) => {
        return RegionService.updateRegion(payload).then(res => {
            commit(USER_UPDATE_REGION, res.data);
            return res.data;
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
