import * as types from './mutation-types'

export default {
    startLoading(context, actionData) {
        let payload = {
          type: types.START_LOADING,
          data: actionData
        };
        context.commit(payload)
    },
    stopLoading(context, actionData) {
        let payload = {
            type: types.STOP_LOADING,
            data: actionData
        };
        context.commit(payload)
    }
};
