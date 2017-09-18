<template>
<main>
    <header id="home">
        <div id="home-slider" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">
                <div class="item active" style="background-image: url(../assets/images/slider/bg-1.jpg)">
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
        
        const url = 'http://makeyourholiday.local/wp-json/wp/v2/posts';

        axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                const isGallery = ( item ) => {
                    return item.format === 'gallery' && item; 
                }

                const isCover = ( item ) => {
                    return item.title === 'cover';
                }
    
                const getGalleries = _.compose( _.map( _.prop('custom_fields') ), _.filter( isGallery ) );
                const galleries = getGalleries( data );

                const getCoversUrl =  _.map( _.compose( _.map( _.prop('sizes') ), _.filter( isCover ) ) );
                const getCoversCaption =  _.map( _.compose( _.map( _.prop('caption') ), _.filter( isCover ) ) );

                const getPostsId = _.compose( _.map( _.prop('id') ), _.filter( isGallery ) );

                this.getIdx({
                    type: types.IDX,
                    idx: getPostsId( data )
                });

                this.getCaptions({
                    type: types.CAPTIONS,
                    captions: getCoversCaption( galleries )
                });

                this.getCovers({
                    type: types.COVERS,
                    covers: getCoversUrl( galleries )
                });

                console.log( 'home mounted: -> ', this.captions );
            });
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
