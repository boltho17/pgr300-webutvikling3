import React from 'react';
import {connect} from 'react-redux';
import {fetchPostImage} from "../actions";
import Card from "react-bootstrap/Card";


// Displays a random image from Unsplash API if the newspost don't contain any image.
// This component is using Redux for storing state.
class ImagePlaceholder extends React.Component {

    placeholderImage = '';
    category = '';

    componentDidMount() {
        this.props.fetchPostImage();

        if(this.props.postImage.urls) {
            this.placeholderImage = this.props.postImage.urls.regular;
            console.log(this.placeholderImage)
        } else {
            this.placeholderImage = "https://illico-travel.ch/wp-content/themes/illico/img/unknown.png";
        }
    }

    renderImage = () => {
        return (
            <div>
                <Card.Img className="image" variant="top"
                          src={this.placeholderImage}
                          alt="error"/>
            </div>
        )
    };

    render() {
        return <div>{this.renderImage()}</div>
    }
}

const mapStateToProps = state => {
    return {postImage: state.postImage};
};

export default connect(
    mapStateToProps,
    {fetchPostImage}
)(ImagePlaceholder);
