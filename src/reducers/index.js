import {combineReducers} from "redux";
import postImageReducer from "./postImageReducer";


export default combineReducers({
    postImage: postImageReducer
});
