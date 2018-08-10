import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Login from '../pages/LoginPage';
import Signup from '../pages/SignupPage';
import CartDropdown from '../buttons/CartDropdown';
import {
    Button,
    Navbar,
    NavDropdown,
    MenuItem,
    Nav,
    NavItem,
    Glyphicon,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import { Link } from 'react-router-dom';

class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    render() {
        const { isAuthenticated, user, logout, cart } = this.props;
        return (
            <Navbar fixedTop fluid style={{ backgroundColor: '#f4f1ea' }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link
                            style={{
                                fontSize: '30px',
                                color: 'rgb(56, 33, 16)'
                            }}
                            to="/"
                        >
                            <Glyphicon glyph="book" /> By The Book
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                            <Search />
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            <CartDropdown cart={cart} />
                        </NavItem>
                        {(!isAuthenticated && (
                            <NavDropdown
                                title={<FontAwesomeIcon icon={faUserCircle} />}
                                id="basic-nav-dropdown"
                                style={{ fontSize: '30px', color: '#382110' }}
                            >
                                <MenuItem>
                                    <Login />
                                </MenuItem>
                                <MenuItem>
                                    <Signup />
                                </MenuItem>
                            </NavDropdown>
                        )) || (
                            <NavDropdown
                                title={
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        style={{ color: '#382110' }}
                                    />
                                }
                                id="basic-nav-dropdown"
                                style={{
                                    fontSize: '30px'
                                }}
                            >
                                <MenuItem style={{ fontSize: '16px' }}>
                                    <p>
                                        <Glyphicon glyph="user" /> Signed in as{' '}
                                        {user.username}
                                    </p>
                                </MenuItem>
                                <MenuItem divider />

                                <MenuItem style={{ fontSize: '16px' }}>
                                    <Link to={'/profile/' + user.username}>
                                        <p>Profile</p>
                                    </Link>
                                </MenuItem>
                                <MenuItem style={{ fontSize: '16px' }}>
                                    <Link to={'/orders'}>
                                        <p>Orders</p>
                                    </Link>
                                </MenuItem>
                                {isAuthenticated &&
                                    user.username === 'admin' && (
                                        <React.Fragment>
                                            <MenuItem
                                                style={{ fontSize: '16px' }}
                                            >
                                                <Link to="/admin/createbook">
                                                    Add a Book
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                style={{ fontSize: '16px' }}
                                            >
                                                <Link to="/admin/createauthor">
                                                    Add an Author
                                                </Link>
                                            </MenuItem>
                                        </React.Fragment>
                                    )}

                                <MenuItem divider />
                                <MenuItem style={{ fontSize: '16px' }}>
                                    <Link to="/" onClick={logout}>
                                        <Glyphicon glyph="log-out" /> Logout
                                    </Link>{' '}
                                </MenuItem>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown
                            title={<FontAwesomeIcon icon={faArchive} />}
                            id="basic-nav-dropdown"
                            style={{ fontSize: '30px' }}
                        >
                            <MenuItem style={{ fontSize: '20px' }}>
                                View All Authors
                            </MenuItem>
                            <MenuItem style={{ fontSize: '20px' }}>
                                Categories
                            </MenuItem>
                        </NavDropdown>
                        <NavItem>
                            <Link
                                style={{
                                    fontSize: '30px',
                                    textDecoration: 'none',
                                    color: '#382110'
                                }}
                                to="/"
                            >
                                <Glyphicon glyph="home" /> Home
                            </Link>
                        </NavItem>

                        {/* <NavItem>
                            <Link
                                style={{
                                    fontSize: '30px',
                                    textDecoration: 'none',
                                    color: 'grey'
                                }}
                                to="/contact"
                            >
                                <FontAwesomeIcon icon={faAddressBook} /> Contact
                            </Link>
                        </NavItem> */}
                        {/* <NavItem>
                            <Link
                                style={{
                                    fontSize: '30px',
                                    textDecoration: 'none',
                                    color: 'grey'
                                }}
                                to="/about"
                            >
                                <FontAwesomeIcon icon={faInfoCircle} /> About
                            </Link>
                        </NavItem> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        logout: PropTypes.func.isRequired,
        user: state.user,
        cart: state.cart
    };
}
export default connect(
    mapStateToProps,
    { logout: actions.logout }
)(TopNavigation);
