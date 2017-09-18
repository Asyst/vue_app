import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import _ from 'ramda'
import axios from 'axios'
// import * as actions from './actions'
// import * as getters from './getters'
// import portfolio from './modules/portfolio'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const url = 'http://makeyourholiday.local/wp-json/wp/v2/posts';

const isGallery = ( item ) => {
    return item.format === 'gallery' && item; 
}

const isCover = ( item ) => {
    return item.title === 'cover';
}

const getGalleries = _.compose( _.map( _.prop('custom_fields') ), _.filter( isGallery ) );

export default new Vuex.Store({
    state: {
        count: 0,
        idx: [],
        captions: [],
        covers: [],
        items: []
    },
    mutations: {
        [types.IDX] ( state, payload ) {
            state.idx = { ...state.idx, idx: payload.idx }
            console.log('mutations -> ', state.idx);
        },
        [types.COVERS] ( state, payload ) {
            state.covers = { ...state.covers, covers: payload.covers }
            console.log('mutations -> ', state.covers);
        },
        [types.CAPTIONS] ( state, payload ) {
            state.captions = { ...state.captions, captions: payload.captions }
            console.log('mutations -> ', payload.captions);
        },
        setItems( state, payload ) {
            state.items = { ...payload.items }
        }
    },
    // actions: {
    //     getIdx ( { commit } ) {
    //         axios.get( url )
    //             .then(( response ) => {
    //                 return response.data;
    //             })
    //             .then(( data ) => {
    //                 const getPostsId = _.compose( _.map( _.prop('id') ), _.filter( isGallery ) );

    //                 commit({
    //                     type: types.IDX,
    //                     idx: getPostsId( data )
    //                 });
    //             });
    //     },
    //     getCaptions ( { commit } ) {
    //         axios.get( url )
    //             .then(( response ) => {
    //                 return response.data;
    //             })
    //             .then(( data ) => {
    //                 const getCoversCaption =  _.map( _.compose( _.map( _.prop('caption') ), _.filter( isCover ) ) );

    //                 const galleries = getGalleries( data );

    //                 commit(types.CAPTIONS, {
    //                     captions: getCoversCaption( galleries )
    //                 });
    //             });
    //     },
    //     getCovers ( { commit } ) {
    //         axios.get( url )
    //             .then(( response ) => {
    //                 return response.data;
    //             })
    //             .then(( data ) => {
    //                 const getCoversUrl =  _.map( _.compose( _.map( _.prop('sizes') ), _.filter( isCover ) ) );

    //                 const galleries = getGalleries( data );

    //                 console.log('getCovers -> ', getCoversUrl( galleries ));

    //                 commit(types.COVERS, {
    //                     covers: getCoversUrl( galleries )
    //                 });
    //             });
    //     }
    // }
})