
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import _ from 'ramda'
import store from './store'
import routes from './routes'

// Vue.use(Vuex);
Vue.use(VueRouter);

// export const store = new Vuex.Store({
//     state: {
//         count: 0,
//         idx: [],
//         captions: [],
//         covers: [],
//         items: []
//     },
//     mutations: {
//         increment(state) {
//             state.count++
//         },
//         setIdx( state, payload ) {
//             state.idx = { ...payload.idx }
//         },
//         setCaptions( state, payload ) {
//             state.captions = { ...payload.captions }
//         },
//         setCovers( state, payload ) {
//             state.covers = { ...payload.covers }
//         },
//         setItems( state, payload ) {
//             state.items = { ...payload.items }
//         }
//     }
// });

const router = new VueRouter({
    routes
});

const app = new Vue({
    store,
    router,
    data: {
       
    },
    created() {
        // console.log( 'created: -> ', window.location.pathname );
    },
    mounted() {
        //#main-slider
        var slideHeight = $(window).height();
        $('#home-slider .item').css('height',slideHeight);

        $(window).resize(function(){'use strict',
            $('#home-slider .item').css('height',slideHeight);
        });
    
        //Initiat WOW JS
        new WOW().init();
        //smoothScroll
        smoothScroll.init();
    }

}).$mount('#app');
