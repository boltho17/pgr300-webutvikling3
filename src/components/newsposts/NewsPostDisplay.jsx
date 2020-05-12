import React from 'react';
import {MyModal} from "../MyModal";
import webapi from "../../apis/webapi";
import {withRouter} from "react-router";
import Button from "react-bootstrap/Button";

/*  Displays the selected post with details.
*   Receives a single post as props and sets this to state.
*   Uses session storage in case the page is reloaded and no props is received.
* */
class NewsPostDisplay extends React.Component {

    deleteButton = null;
    editButton = null;

    constructor(props) {
        super(props);

        // Sets initial state from props if it exists
        if (this.props.post) {
            this.state = {post: this.props.post, modalShow: false};

            // Enables the option to delete or edit a post if the post is authored by one of these. Hardcoded users at the moment.
            const author = this.state.post.author;
            if(author === 'Thomas Bjerke' || author === 'Ola Nordmann' || author === 'Rolando Gonzalez') {
                this.deleteButton = <Button variant="danger" onClick={this.showModal}>Delete</Button>
                this.editButton = <Button variant="warning" onClick={this.editCurrentItem}>Edit</Button>
            }
        }

        // Retrieves the previous saved state from the browser session storage if no props exist.
        else {
            const savedSession = JSON.parse(sessionStorage.getItem('savedSession'));
            this.state = {post: savedSession, modalShow: false};
            console.log("Session restored!")
        }
    }

    // Saves the current state to session storage
    componentDidMount() {
        sessionStorage.setItem('savedSession', JSON.stringify(this.state.post));
        console.log("Session stored for page reload!")
    }

    showModal = () => {
        this.setState({modalShow: true})
    };

    hideModal = () => {
        this.setState({modalShow: false})
    };

    deleteCurrentItem = async () => {
        const id = this.props.post.id;

        if (id != null) {
            await webapi.delete(`/${this.props.post.id}`);
            this.setState({post: null, modalShow: false});
            //Navigates back to the homepage using withRouter from react-router. Re-renders parent state with a callback method.
            this.props.rerender();
            this.props.history.push("/");
        }
    };

    editCurrentItem = () => {
        this.props.history.push("/newsposts/edit");
    };

    render() {
        return (
            <div className="container-fluid">
                {this.state.post ? (
                    <div>
                            <div>
                                {this.state.post.urlToImage? (

                                <img
                                    className="image-cover"
                                    src={this.state.post.urlToImage}
                                    alt={this.state.post.urlToImage.toString()}/>
                                ):(
                                    <img
                                        className="image-cover"
                                        src="https://illico-travel.ch/wp-content/themes/illico/img/unknown.png"
                                        alt="error"/>
                                )}

                                <section>
                                    {this.state.post.author? (
                                        <p className="author">Author: {this.state.post.author}</p>
                                    ) : (
                                        <p className="author">Source: {this.state.post.source.name.toLowerCase()}</p>
                                    )}
                                    <h1>{this.state.post.title}</h1>
                                    <h5>{this.state.post.description}</h5>
                                    <p className="text">{this.state.post.content}</p>
                                </section>

                               {this.deleteButton}
                               {this.editButton}

                            </div>
                        {this.state.modalShow ? (
                            <MyModal show={this.state.modalShow} hide={this.hideModal} post={this.state.post} onDelete={this.deleteCurrentItem}/>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }
}

// withRouter fra react-router sørger for navigasjon tilbake til "/"  når man trykker på delete i Modal.
export default withRouter(NewsPostDisplay);
