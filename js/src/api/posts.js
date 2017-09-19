import axios from 'axios';
import _ from 'ramda';

const url = 'http://makeyourholiday.local/wp-json/wp/v2/posts';

// helper functions
const isGallery = ( item ) => {
    return item.format === 'gallery' && item; 
}

const isCover = ( item ) => {
    return item.title === 'cover';
}

const getGalleries = _.compose( _.map( _.prop('custom_fields') ), _.filter( isGallery ) );

export default {
    getAllPosts() {
        return axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                return data;
            });
    },
    getGalleries() {
        return axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                return getGalleries( data );
            });
    },
    getGalleriesId() {
        return axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                const getPostsId = _.compose( _.map( _.prop('id') ), _.filter( isGallery ) );

                return getPostsId( data );
            });
    },
    getCoversUrl() {
        return axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                const galleries = getGalleries( data );
                const getCoversUrl =  _.map( _.compose( _.map( _.prop('sizes') ), _.filter( isCover ) ) );

                return getCoversUrl( galleries );
            });
    },
    getCoversCaption() {
        return axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                const galleries = getGalleries( data );
                const getCoversCaption =  _.map( _.compose( _.map( _.prop('caption') ), _.filter( isCover ) ) );

                return getCoversCaption( galleries );
            });
    }
}