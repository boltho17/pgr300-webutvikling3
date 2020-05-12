import React from 'react';
import ImageUpload from "../ImageUpload";
import webapi from "../../apis/webapi";
import Button from "react-bootstrap/Button";
import {withRouter} from "react-router";

class NewsPostEdit extends React.Component {

    constructor(props) {
        super(props);

        const post = this.props.post;

        if(post) {
            this.state = {
                id: post.id,
                author: post.author,
                category: post.category,
                title: post.title,
                description: post.description,
                content: post.content,
                urlToImage: post.urlToImage,
                titleError: false,
                descriptionError: false,
                contentError: false
            }
        }
        // Not an optimal solution, but prevents "Cannot read property of null error" if the page is refreshed:
        else {
            this.state = {
                id: null,
                author: 'Thomas Bjerke',
                category: '',
                title: '',
                description: '',
                content: '',
                urlToImage: '',
                titleError: false,
                descriptionError: false,
                contentError: false
            };
        }
    }

    // Denne metoden er tatt fra: https://reactjs.org/docs/forms.html (Handling Multiple Form Inputs)
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        if (name !== '') {
            this.setState({
                [name + 'Error']: false
            })
        }
    };

    // Sender state objektet til API med Axios. Nullstiller textboksene.
    onFormSubmit = async e => {
        e.preventDefault();

        if (this.state.title === '') {
            this.setState({titleError: true})
        }
        if (this.state.description === '') {
            this.setState({descriptionError: true})
        }
        if (this.state.content === '') {
            this.setState({contentError: true})
        } else {
            await webapi.put("https://localhost:5001/newspost", this.state);
            alert('News Post is Updated!')

            //Navigates back to the homepage using withRouter from react-router. Re-renders parent state with a callback method.
            this.props.rerender();
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <section className="section">
                <form className="container-fluid mt-3" onSubmit={this.onFormSubmit}>

                    <div className="field">
                        <label className="col-4">Author</label>
                        <select name="author" value={this.state.author} onChange={this.handleInputChange}>
                            <option value="Thomas Bjerke">Thomas Bjerke</option>
                            <option value="Ola Nordmann">Ola Nordmann</option>
                            <option value="Rolando Gonzalez">Rolando Gonzales</option>
                        </select>
                    </div>

                    <br/>

                    <div className="field">
                        <label className="col-4">Category</label>
                        <select name="category" value={this.state.category} onChange={this.handleInputChange}>
                            <option value='null'>No category</option>
                            <option value="Business">Business</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Sports">Sports</option>
                            <option value="Health">Health</option>
                            <option value="Technology">Technology</option>
                        </select>

                    </div>

                    <br/>

                    <div className="field">
                        <label className="col-4">Title</label>
                        {this.state.titleError ? (
                            <div>
                                <input className="input" name="title"
                                       type="text"
                                       value={this.state.title}
                                       onChange={this.handleInputChange}
                                       style={{borderColor: 'red'}}/>
                                <label className="error col-12">Title is required</label>
                            </div>
                        ) : (
                            <input className="input" name="title"
                                   type="text"
                                   value={this.state.title}
                                   onChange={this.handleInputChange}/>
                        )}
                    </div>

                    <br/>

                    <div className="field">
                        <label className="col-4">Description</label>
                        {this.state.descriptionError ? (
                            <div>
                                <input className="input"
                                       name="description"
                                       type="text"
                                       value={this.state.description}
                                       onChange={this.handleInputChange}
                                       style={{borderColor: 'red'}}/>
                                <label className="error col-12">Description is required</label>
                            </div>
                        ) : (
                            <input className="input"
                                   name="description"
                                   type="text"
                                   value={this.state.description}
                                   onChange={this.handleInputChange}/>
                        )}
                    </div>

                    <br/>

                    <div className="field">
                        <label className="col-4">Content</label>
                        {this.state.contentError ? (
                            <div>
                                <input className="input"
                                       name="content" type="text"
                                       value={this.state.content}
                                       onChange={this.handleInputChange}
                                       style={{borderColor: 'red'}}/>
                                <label className="error col-12">Some text content is required</label>
                            </div>
                        ) : (
                            <input className="input"
                                   name="content" type="text"
                                   value={this.state.content}
                                   onChange={this.handleInputChange}/>
                        )}

                    </div>

                    <br/>

                    <div className="field">
                        <label className="col-4">ImageURL</label>
                        <input className="input"
                               name="urlToImage"
                               type="text"
                               value={this.state.urlToImage}
                               onChange={this.handleInputChange}/>
                    </div>
                </form>

                <br/>

                <div className="field">
                    <label className="col-4">Or upload image file:</label>
                    <ImageUpload/>
                </div>

                <div className="btn-container">
                    <Button
                        className="button"
                        type="submit"
                        variant="success"
                        onClick={this.onFormSubmit}>Update
                    </Button>
                </div>
            </section>
        );
    }
}

export default withRouter(NewsPostEdit);
