import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID bd9dc2c765febf9edb0d2973c4e6d741f09b7d04d26a09754917f54ca32a52e5'
    }
})
