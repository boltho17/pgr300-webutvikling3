import React from 'react';
import Carousel from "react-bootstrap/Carousel";

class MyCarousel extends React.Component {
    state = {featured: []};

    // Generates a random number in the range of total numbers of posts from props.
    //
    featuredPostsArray = [];

    constructor(props) {
        super(props);


        // Sets initial state from props if it exists
        if (this.props.posts) {
            this.state = {featured: this.props.posts};


            // Generates 3 random and unique numbers in the range of total numbers of posts from props.
            // Then pushes 3 random posts to featuredPostArray.
            const numbersArray = [];
            while (numbersArray.length < 3) {
                let random = Math.floor(Math.random() * this.props.posts.length);
                if (numbersArray.indexOf(random) === -1) {
                    numbersArray.push(random);
                    this.featuredPostsArray.push(this.state.featured[random])
                }
            }
        }
    }


    render() {
        return (
            <div className="carousel-container">
                <Carousel fade="true">
                    <Carousel.Item>
                        {this.featuredPostsArray[0].urlToImage ? (
                            <img
                                className="slider-image d-block w-100"
                                src={this.featuredPostsArray[0].urlToImage}
                                alt="First slide = null"
                            />
                        ) : (
                            <img
                                className="slider-image d-block w-100"
                                src="https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
                                alt="First slide = null"
                            />
                        )}

                        <Carousel.Caption>
                            <h3>{this.featuredPostsArray[0].title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        {this.featuredPostsArray[1].urlToImage ? (
                            <img
                                className="slider-image d-block w-100"
                                src={this.featuredPostsArray[1].urlToImage}
                                alt="Second slide = null"
                            />
                        ) : (
                            <img
                                className="slider-image d-block w-100"
                                src="https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
                                alt="Second slide = null"
                            />
                        )}

                        <Carousel.Caption>
                            <h3>{this.featuredPostsArray[1].title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        {this.featuredPostsArray[2].urlToImage ? (
                            <img
                                className="slider-image d-block w-100"
                                src={this.featuredPostsArray[2].urlToImage}
                                alt="Third slide"
                            />
                        ) : (
                            <img
                                className="slider-image d-block w-100"
                                src="https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
                                alt="Third slide"
                            />
                        )}

                        <Carousel.Caption>
                            <h3>{this.featuredPostsArray[2].title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
};


export default MyCarousel
