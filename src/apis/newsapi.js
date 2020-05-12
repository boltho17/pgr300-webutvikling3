import axios from 'axios';

const KEY = '90aa853281a849aeb822b118f7ddffda'

export default axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        Authorization: KEY
    }
});
