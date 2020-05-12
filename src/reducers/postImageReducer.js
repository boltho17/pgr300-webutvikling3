export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POST_IMAGE':
            return action.payload;
        default:
            return state
    }
};
