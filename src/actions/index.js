import unsplash from "../apis/unsplash";

// Unsplash API has a rate limit of 50 requests per hour. If the limit is exceeded the API will respond with an error Status Code 403
export const fetchPostImage = () => async dispatch => {
    const response = await unsplash.get('/photos/random');

    dispatch({type: 'FETCH_POST_IMAGE', payload: response.data})
    console.log(response.data)
};
