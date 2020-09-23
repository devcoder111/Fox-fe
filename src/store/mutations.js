import * as types from './mutation-types'

export default {
    [types.START_LOADING](state, payload) {
        state.isLoading = true;
    },
    [types.STOP_LOADING](state, payload) {
        state.isLoading = false;
    }
};
