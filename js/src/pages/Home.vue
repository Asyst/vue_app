<template>
<main>
    <header id="home">
        <div id="home-slider" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
                <div class="item active" style="background-image: url(./assets/images/slider/bg-1.jpg)">
                    <div class="caption">
                    <h1 class="animated fadeInLeftBig">{{ title }}</h1>
                    <p class="animated fadeInRightBig">{{ description }}</p>
                    <a data-scroll class="btn btn-start animated fadeInUpBig" href="#portfolio">Start now</a>
                    </div>
                </div>
            </div>

            <a id="tohash" href="#contact"><i class="fa fa-angle-down"></i></a>

        </div><!--/#home-slider-->
    </header>
    <section id="portfolio">
        <div class="container">
            <div class="row">
                <div class="heading text-center col-sm-8 col-sm-offset-2 wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">
                    <h2>Наши проекты</h2>
                    <p>Мы просто делаем невест счастливее, а этот мир прекрасней. <br> Об остальном расскажут наши свадьбы</p>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <portfolio-item 
                    v-for="(cover, index) in covers" 
                    v-bind:key="index"
                    v-bind:cover="cover[0].medium_large"
                    v-bind:caption="captions[index][0]"
                    v-bind:id="idx[index]">
                </portfolio-item>
            </div>
        </div>
        
        <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
            <router-view></router-view>
        </transition>
    </section><!--/#portfolio-->
</main>
</template>

<script>
import _ from 'ramda';
import axios from 'axios';
import { mapMutations, mapState, mapActions } from 'vuex';
import portfolioItem from '../components/portfolioItem.vue';
import * as types from '../store/mutation-types'
import posts from '../api/posts'

export default {
    data() {
        return {
            title: 'Юлия Ушакова',
            description: 'Лучшая ведущая Украины'
        }
    },
    components: {
        'portfolio-item': portfolioItem
    },
    methods: {
        ...mapMutations({
            getIdx: types.IDX,
            getCovers: types.COVERS,
            getCaptions: types.CAPTIONS
        }),
        // ...mapActions([
        //     'getIdx',
        //     'getCaptions',
        //     'getCovers'
        // ])
    },
    computed: {
      ...mapState({
          idx: state => state.idx.idx,
          covers: state => state.covers.covers,
          captions: state => state.captions.captions
      })  
    },
    created() {
        // this.getIdx(types.IDX);
        // this.getCovers(types.COVERS);
        // this.getCaptions(types.CAPTIONS);

        const store = this.$store;

        posts.getGalleriesId()
            .then(( idx ) => {
                if ( process.env.NODE_ENV === 'development' ) {
                    console.log( 'posts api -> ', idx );
                }

                store.commit({
                    type: types.IDX,
                    idx: idx
                });
            })

        posts.getCoversCaption()
            .then(( captions ) => {
                if ( process.env.NODE_ENV === 'development' ) {
                    console.log( 'posts api -> ', captions );
                }

                store.commit({
                    type: types.CAPTIONS,
                    captions: captions
                });
            })

        posts.getCoversUrl()
            .then(( urls ) => {
                if ( process.env.NODE_ENV === 'development' ) {
                    console.log( 'urls api -> ', urls );
                }
                
                store.commit({
                    type: types.COVERS,
                    covers: urls
                });
            })

        console.log('store -> ', store);
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>
