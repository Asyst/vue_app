import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}

export const getIdx = ( { commit } ) => {
    api.getData( data => {
        commit(types.GET_IDX, { idx })
    })
}

export const getCovers = ( { commit } ) => {
    console.log('covers');
    api.getData( data => {
        commit(types.GET_COVERS, { covers })
    })
}

export const getCaptions = ( { commit } ) => {
    api.getData( data => {
        commit(types.GET_CAPTIONS, { captions })
    })
}