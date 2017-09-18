import api from '../../api/index';
import * as types from '../mutation-types';

const state = {
    count: 0,
    idx: [],
    captions: [],
    covers: [],
    items: []
}
console.log('api -> ', api);

// actions
const actions = {
    getIdx ( { commit } ) {
        api.getData( data => {
            commit(types.GET_IDX, { idx })
        })
    },
    getCovers ( { commit } ) {
        api.getData( data => {
            commit(types.GET_COVERS, { covers })
        })
    },
    getCaptions ( { commit } ) {
        api.getData( data => {
            commit(types.GET_CAPTIONS, { captions })
        })
    }
}

const mutations = {
    increment(state) {
        state.count++
    },
    [types.GET_IDX] ( state, payload ) {
        state.idx = { ...payload.idx }
    },
    [types.GET_COVERS] ( state, payload ) {
        state.idx = { ...payload.covers }
    },
    [types.GET_CAPTIONS] ( state, payload ) {
        state.idx = { ...payload.captions }
    },
    // setCaptions( state, payload ) {
    //     state.captions = { ...payload.captions }
    // },
    // setCovers( state, payload ) {
    //     state.covers = { ...payload.covers }
    // },
    // setItems( state, payload ) {
    //     state.items = { ...payload.items }
    // }
}

export default {
    state,
    actions,
    mutations
  }