<template>
<div id="portfolio-single-wrap">
    <div class="cssload-container">
        <div class="cssload-speeding-wheel" v-show="isLoad"></div>
    </div>
    
        <div id="portfolio-single">
            <div class="container-fluid" v-show="isLoaded">
                    <div class="portfolio-heading">
                        <h1>@{{ showTitle }}</h1>
                    </div>
                
                    <div class="col-sm-3 photo" v-for="(photo, index) in photos" :key="index">
                    
                            <a :href="photo.url" data-lightbox="portfolio">
                                <img class="img-responsive" :src="photo.sizes.medium_large" :alt="photo.title">
                            </a>

                    </div>
                
            </div>
        </div>
    
</div><!-- /#portfolio-single-wrap -->
</template>

<script>
import axios from 'axios'
import _ from 'ramda'
import { mapState, mapMutations, mapGetters  } from 'vuex'
import * as types from '../store/mutation-types'
import api from '../api/posts'

export default {
    data() {
        return {
            isLoad: true,
            isLoaded: false
        }
    },
    methods: {
        ...mapMutations({
            getTitle: types.TITLE,
            getPhotos: types.GET_PHOTOS
        })
    },
    computed: {
        ...mapState({
            title: state => state.title ,
            photos: state => state.photos.photos
        }),
        ...mapGetters([
            'showTitle'
        ])
    },
    created() {
        const url = `http://makeyourholiday.local/wp-json/wp/v2/posts/${ this.$route.params.id }`;

        axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                const isGallery = ( item ) => {
                    return item.format === 'gallery' && item; 
                }
    
                const getTitle = _.prop('title');
                const getGalleries = _.prop('custom_fields');

                this.getPhotos({
                    type: types.GET_PHOTOS,
                    photos: getGalleries( data )
                });
                this.getTitle({
                    type: types.TITLE,
                    title: data.title
                });

                this.isLoad = false;
                this.isLoaded = true;

                console.log( 'portfolio mounted: ', this.title );

                var containerElement, scroller;

                containerElement = document.getElementById('portfolio-single');

                scroller = new FTScroller(containerElement, {
                    scrollbars: false,
                    scrollingX: false
                });
            });

            // api.getData().then(( posts ) => {
            //     console.log( 'from api -> ', posts );
            // });
    }
}
</script>

<style>
    .photo {
        padding: 12px 0px 0px 12px !important;
    }

    .cssload-container {
        position: absolute;
        width: 100%;
        height: 49px;
        text-align: center;
    }

    .cssload-speeding-wheel {
        width: 49px;
        height: 49px;
        margin: 0 auto;
        border: 3px solid rgb(0,0,0);
        border-radius: 50%;
        border-left-color: transparent;
        border-right-color: transparent;
        animation: cssload-spin 575ms infinite linear;
            -o-animation: cssload-spin 575ms infinite linear;
            -ms-animation: cssload-spin 575ms infinite linear;
            -webkit-animation: cssload-spin 575ms infinite linear;
            -moz-animation: cssload-spin 575ms infinite linear;
    }



    @keyframes cssload-spin {
        100%{ transform: rotate(360deg); transform: rotate(360deg); }
    }

    @-o-keyframes cssload-spin {
        100%{ -o-transform: rotate(360deg); transform: rotate(360deg); }
    }

    @-ms-keyframes cssload-spin {
        100%{ -ms-transform: rotate(360deg); transform: rotate(360deg); }
    }

    @-webkit-keyframes cssload-spin {
        100%{ -webkit-transform: rotate(360deg); transform: rotate(360deg); }
    }

    @-moz-keyframes cssload-spin {
        100%{ -moz-transform: rotate(360deg); transform: rotate(360deg); }
    }
</style>
