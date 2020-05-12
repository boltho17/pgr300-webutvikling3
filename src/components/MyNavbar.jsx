import React from 'react';
import {Navbar} from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom';

class MyNavbar extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Navbar className="myNavbar" expand="md">
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src="logo512.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {'PGR302 News'}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="mr-auto">
                            <Link className="links" to="/business">Business</Link>
                            <Link className="links" to="/entertainment">Entertainment</Link>
                            <Link className="links" to="/sports">Sports</Link>
                            <Link className="links" to="/health">Health</Link>
                            <Link className="links" to="/technology">Tech</Link>
                            <Link className="links new" to="/newsposts/new">Create new</Link>
                        </Nav>

                        <Navbar.Text style={{fontSize: '10px', color: 'white'}}>
                            Signed in as: <a className="user-name" href="#login">Thomas Bjerke</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default MyNavbar;
