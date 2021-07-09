import './Menu.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../assets/images/tartan37.svg';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";

class MenuInternal extends Component<any, any> {

    getIsActive(path: string) {
        if (this.props.location.pathname.toUpperCase() === path.toUpperCase()) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <div>
                <Navbar bg="t37" expand="lg" variant="dark">
                    <Navbar.Brand>
                        <Link className="logo" to={"/"}>
                            <img className="logo-img" src={logo}/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link active={this.getIsActive("/fleet")} href="/fleet">Fleet</Nav.Link>
                            <Nav.Link active={this.getIsActive("/gallery")} href="/gallery">Gallery</Nav.Link>
                            <Nav.Link active={this.getIsActive("/specs")} href="/specs">Specifications</Nav.Link>
                            <Nav.Link href="http://www.tartan37.com/t37forum/">Forum</Nav.Link>
                            <Nav.Link active={this.getIsActive("/4sale")} href="/4sale">Sales Floor</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const Menu = withRouter(MenuInternal);

export default Menu;
