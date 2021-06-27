import './Menu.css';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../assets/images/tartan37.svg';



type MenuState = {
    expanded: boolean
}

class MenuInternal extends Component<any, MenuState> {

    constructor(props: any) {
        super(props);
        this.state = {expanded: false}
        this.menuClick = this.menuClick.bind(this)
        this.linkClick = this.linkClick.bind(this)
    }

    menuClick() {
        this.setState({expanded: !this.state.expanded})
    }

    linkClick() {
        this.setState({expanded: false})
    }

    getClassNames(path: string) {
        if (this.props.location.pathname.toUpperCase() === path.toUpperCase()) {
            return "menu-link selected"
        } else {
            return "menu-link"
        }
    }

    render() {
        return (
            <div className="header">
                <Link className="logo" to={"/"} onClick={this.linkClick}>
                    <img className="logo-img" src={logo}/>
                </Link>
                <input className="menu-btn" type="checkbox" id="menu-btn"
                       checked={this.state.expanded}
                       onChange={this.menuClick}/>

                <label className="menu-icon" htmlFor="menu-btn">
                    <span className="navicon"></span>
                </label>
                <ul className="menu">
                    <li className="pure-menu-item">
                        <Link to="/fleet" className={this.getClassNames("/fleet")} onClick={this.linkClick}>Fleet</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/gallery" className={this.getClassNames("/gallery")} onClick={this.linkClick}>Gallery</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/specs" className={this.getClassNames("/specs")} onClick={this.linkClick}>Specifications</Link>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/resources" className={this.getClassNames("/resources")} onClick={this.linkClick}>Tech Resources</Link>
                    </li>
                    <li className="pure-menu-item">
                        <a href="http://www.tartan37.com/t37forum/" className="menu-link">Forum</a>
                    </li>
                    <li className="pure-menu-item">
                        <Link to="/4sale" className={this.getClassNames("/4sale")} onClick={this.linkClick}>Sales Floor</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

const Menu = withRouter(MenuInternal);

export default Menu;
