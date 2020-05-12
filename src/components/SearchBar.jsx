import React from 'react'
import {Button} from "react-bootstrap";


class SearchBar extends React.Component {
    state = {term: '', noActive: true, usActive: false, cnActive: false};

    onFormSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    };


    buttonSelected = (buttonId) => {
        switch (buttonId) {
            case 'no':
                this.setState({noActive: true, usActive: false, cnActive: false});
                break;

            case 'us':
                this.setState({noActive: false, usActive: true, cnActive: false});
                break;

            case 'cn':
                this.setState({noActive: false, usActive: false, cnActive: true});
                break;

            default:
                break;
        }
    };

    render() {
        return (
            <div className="searchbar container row">

                <div className="filterButtons">
                    <Button className="btn d-inline-block align-top" variant="none" size="sm"
                            style={{opacity: this.state.noActive? 1 : 0.5}}
                            onClick={() => {this.props.onSubmit(null, 'no'); this.buttonSelected('no');}}><img className="img-nor" src="norway512.png" alt="norge"
                    />Norge</Button>

                    <Button className="btn d-inline-block align-top" variant="none" size="sm"
                            style={{opacity: this.state.usActive? 1 : 0.5}}
                            onClick={() => {this.props.onSubmit(null, 'us'); this.buttonSelected('us');}}><img src="usa512.png" alt="usa"
                    />Usa</Button>
                    <Button className="btn d-inline-block align-top" variant="none" size="sm"
                            style={{opacity: this.state.cnActive? 1 : 0.5}}
                            onClick={() => {this.props.onSubmit(null, 'cn'); this.buttonSelected('cn');}}><img src="china512.png" alt="kina"
                    />Kina</Button>
                </div>

                {/* Search field */}
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <input
                            className="search-field"
                            type="text"
                            placeholder="Search.."
                            value={this.state.term}
                            autoFocus={true}
                            onChange={e => this.setState({term: e.target.value})}
                        />
                        <button className="search-btn"
                        >Go
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar


