import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import '../styles/Main.sass';

import axios from 'axios';
import newsapi from "../apis/newsapi";
import webapi from "../apis/webapi";
import MyNavbar from "./MyNavbar";
import SearchBar from "./SearchBar";
import PostList from "./PostList";
import NewsPostDisplay from "./newsposts/NewsPostDisplay";
import NewsPostCreate from "./newsposts/NewsPostCreate";
import NewsPostEdit from "./newsposts/NewsPostEdit";
import MyCarousel from "./MyCarousel";


class App extends React.Component {
    state = {
        posts: ["Loading.."],
        businessPosts: [],
        entertainmentPosts: [],
        sportsPosts: [],
        healthPosts: [],
        techPosts: [],
        selectedPost: null,
        countryCode: 'no',
        showSearch: true
    };

    concatState = null;

    // Initial loading of news posts from the API
    componentDidMount() {
        this.getNewsPosts(null, 'this.state.countryCode', 20);

        this.getNewsPosts('business', 'this.state.countryCode');
        this.getNewsPosts('entertainment', 'this.state.countryCode');
        this.getNewsPosts('sports', 'this.state.countryCode');
        this.getNewsPosts('health', 'this.state.countryCode');
        this.getNewsPosts('technology', 'this.state.countryCode');

    };

    // Sends two parallel Get request to the newsAPI(public) with arguments as params, and to my own webAPI.
    // The response from both API's are concatenated and then set as state.
    getNewsPosts = async (category, country, numberOfResults = 20) => {
        try {
            await axios.all([
                webapi.get(''),
                newsapi.get(`top-headlines?country=${this.state.countryCode}`, {
                    params: {
                        category: category,
                        country: country,
                        pageSize: numberOfResults
                    }
                })
            ]).then(axios.spread((webapiData, newsapiData) => {
                // console.log(webapiData.data);
                // console.log(newsapiData.data.articles);
                this.concatState = webapiData.data.reverse().concat(newsapiData.data.articles);

                /* Single get request before implementing second API:
                const response = await newsapi.get(`top-headlines?country=${this.state.countryCode}`, {
                    params: {
                        category: category,
                        country: country,
                        pageSize: numberOfResults
                    }
                }); */

                // Checks the category parameter and sets the request response to the matching state.
                switch (category) {
                    case 'business':
                        // this.setState({businessPosts: response.data.articles, selectedPost: null});
                        this.setState({businessPosts: newsapiData.data.articles, selectedPost: null});
                        break;
                    case 'entertainment':
                        // this.setState({entertainmentPosts: response.data.articles, selectedPost: null});
                        this.setState({entertainmentPosts: newsapiData.data.articles, selectedPost: null});
                        break;

                    case 'sports':
                        // this.setState({sportsPosts: response.data.articles, selectedPost: null});
                        this.setState({sportsPosts: newsapiData.data.articles, selectedPost: null});
                        break;

                    case 'health':
                        // this.setState({healthPosts: response.data.articles, selectedPost: null});
                        this.setState({healthPosts: newsapiData.data.articles, selectedPost: null});
                        break;

                    case 'technology':
                        // this.setState({techPosts: response.data.articles, selectedPost: null});
                        this.setState({techPosts: newsapiData.data.articles, selectedPost: null});
                        break;

                    default:
                        // this.setState({posts: response.data.articles, selectedPost: null});
                        this.setState({posts: this.concatState, selectedPost: null});
                }
            }));
        } catch (error) {
            console.log(error)
        }
    };

    // Gets passed down as props to the SearchBar component. Gets called back with a search term argument.
    // Then sends a Get request to the newsAPI with the arguments as params. The response from the API get set as state.
    onSearchSubmit = (term, country) => {
        newsapi.get('/top-headlines', {
            params: {q: term, country: country, pageSize: 20}
        }).then(response => {
            this.setState({posts: response.data.articles});
        })
    };

    // This method first gets passed down to <PostList> as props, then further down to <PostItem>.
    // It returns the NewsPost object which is chosen with onClick, then pass it to <NewsPostDisplay> to be displayed.
    onPostSelect = post => {
        this.setState({selectedPost: post});
    };


    // The following code for disableSearchBar is duplicated because
    // calling a method and render a component at the same time in Route path seems problematic:

    // Hides the search bar when navigating to Create New
    disableSearchBar = () => {
        if (this.state.showSearch) {
            this.setState({showSearch: false});
        }
        return <NewsPostCreate/>
    };

    // Hides the search bar when navigating to NewsPostDisplay
    disableSearchBar2 = () => {
        if (this.state.showSearch) {
            this.setState({showSearch: false});
        }
        return <NewsPostDisplay post={this.state.selectedPost} rerender={this.getNewsPosts}/>
    };

    // Hides the search bar when navigating to NewsPostEdit
    disableSearchBar3 = () => {
        if (this.state.showSearch) {
            this.setState({showSearch: false});
        }
        return <NewsPostEdit post={this.state.selectedPost} rerender={this.getNewsPosts}/>
    };

    // Passes the newsposts as props and renders the Carousel component if there are posts in state.
    // Also disables the component when navigating to <NewsPostDisplay> and <NewsPostEdit>
    renderCarousel = () => {
        if (this.state.posts.length > 1 && this.state.showSearch) {
            return <MyCarousel posts={this.state.posts}/>
        }
    };

    render() {
        return (
            <Router>
                <MyNavbar/>
                {this.state.showSearch ? (
                    <SearchBar onSubmit={this.onSearchSubmit}/>
                ) : ('')}

                {this.renderCarousel()}
                <div className="container">
                    <Switch>
                        <Route path="/" exact
                               render={() => <PostList posts={this.state.posts} onPostSelect={this.onPostSelect}/>}/>
                        <Route path="/business" exact render={() => <PostList posts={this.state.businessPosts}/>}/>
                        <Route path="/entertainment" exact
                               render={() => <PostList posts={this.state.entertainmentPosts}/>}/>
                        <Route path="/sports" exact render={() => <PostList posts={this.state.sportsPosts}/>}/>
                        <Route path="/health" exact render={() => <PostList posts={this.state.healthPosts}/>}/>
                        <Route path="/technology" exact render={() => <PostList posts={this.state.techPosts}/>}/>

                        <Route path="/newspost/:id" exact render={this.disableSearchBar2}/>
                        <Route path="/newsposts/new" exact render={this.disableSearchBar}/>
                        <Route path="/newsposts/edit" exact render={this.disableSearchBar3}/>
                        <Redirect from='*' to='/'/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
