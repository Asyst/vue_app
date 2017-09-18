import axios from 'axios';

export default {
    getData() {
        const url = 'http://makeyourholiday.local/wp-json/wp/v2/posts';

        axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                console.log( 'data -> ', data );
                return data;
            });
    }
}