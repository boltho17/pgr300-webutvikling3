import React from 'react';
import Uniqid from 'uniqid';
import PostItem from "./PostItem";

const PostList = ({posts, onPostSelect}) => {
    let renderedList = '';

    if (posts) {
            renderedList = posts.map(post => {
                const uniqueId = Uniqid();
                return <PostItem onPostSelect={onPostSelect} post={post} altId={uniqueId} key={uniqueId}/>
            });
    } else console.log("Error: empty post list")

    return (
        <div className="row">{renderedList}</div>
    )
};

export default PostList;

