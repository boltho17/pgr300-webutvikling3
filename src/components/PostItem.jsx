import React from 'react';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
// import ImagePlaceholder from "./ImagePlaceholder";

const PostItem = ({post, onPostSelect, altId}) => {

    // Parses "ID" to the PostItem url path:
    let id = '';

    if(post.id > 0) {
        id = "/newspost/" + post.id;
    } else {
        id = "/newspost/" + altId;
    }

    return (
        <article className="col-12 col-md-6">
            <Link to={id} onClick={() => onPostSelect(post)}>
                <Card className="card">
                    {post.urlToImage ? (
                        <Card.Img className="image" variant="top" src={post.urlToImage}/>
                    ) : (

                        /* THIS COMPONENT USES REDUX TO STORE STATE, HOWEVER IT CAN BE BUGGY BECAUSE OF REQUEST LIMITS OF THE API.

                        <ImagePlaceholder category={post.category}/>

                         */

                        /* Static placeholder image, comment out when testing <ImagePlaceholder/>*/
                        <Card.Img className="image" variant="top"
                                  src="https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
                                  alt="error"/>
                    )}
                    <div className="content">
                        <Card.Title className="header">{post.title}</Card.Title>
                    </div>
                </Card>
            </Link>
        </article>
    )
};

export default PostItem;
