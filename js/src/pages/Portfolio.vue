<template>
<div id="portfolio-single-wrap">
    <div class="cssload-container">
        <div class="cssload-speeding-wheel" v-show="isLoad"></div>
    </div>
    
        <div id="portfolio-single">
            <div class="container-fluid" v-show="isLoaded">
                
                    <div class="col-sm-3 photo" v-for="(item, index) in items" :key="index">
                    
                            <a :href="item.url" data-lightbox="portfolio">
                                <img class="img-responsive" :src="item.sizes.medium_large" :alt="item.title">
                            </a>

                    </div>
                
            </div>
        </div>
    
</div><!-- /#portfolio-single-wrap -->
</template>

<script>
import axios from 'axios';
import _ from 'ramda';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            isLoad: true,
            isLoaded: false
        }
    },
    computed: {
        ...mapState({
            items: state => state.items
        })
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
    
                const getGalleries = _.prop('custom_fields');

                this.$store.commit({
                    type: 'setItems',
                    items:  getGalleries( data )
                });

                this.isLoad = false;
                this.isLoaded = true;

                console.log( 'portfolio mounted: ', this.items );

                var containerElement, scroller;

                containerElement = document.getElementById('portfolio-single');

                scroller = new FTScroller(containerElement, {
                    scrollbars: false,
                    scrollingX: false
                });
            });
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
