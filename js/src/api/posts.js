import axios from 'axios';

export default {
    getData() {
        const url = 'http://makeyourholiday.local/wp-json/wp/v2/posts';

        const output;

        axios.get( url )
            .then(( response ) => {
                return response.data;
            })
            .then(( data ) => {
                console.log( 'data -> ', data );
                output = data;
                return data;
            });

        return data;
    }
}