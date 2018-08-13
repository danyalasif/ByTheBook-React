
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
    NavDropdown,
    MenuItem,
    Badge,
    Table
} from '../../../node_modules/react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

class CartDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            books: []
        };
    }

    componentDidMount() {
        this.updateCartDropdown();
    }

    updateCartDropdown = () => {
        axios
            .get('/api/cart/cartItems')
            .then(res => this.setState({ books: res.data }));
    };

    render() {
        const { cart } = this.props;
        const { books } = this.state;

        _.debounce(this.updateCartDropdown, 500);
        let color = cart.items.length > 0 ? '#382110' : 'grey';
        return (
            <NavDropdown
                title={
                    <div>
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            style={{ color: color }}
                        />
                        <Badge>{cart.items.length}</Badge>
                    </div>
                }
                id="basic-nav-dropdown"
                style={{
                    fontSize: '30px',
                    color: color,
                    textDecoration: 'none'
                }}
                noCaret
                onClick={this.updateCartDropdown}
            >
                {(books &&
                    books.length < 1 && (
                        <MenuItem>No Item In Cart</MenuItem>
                    )) || (
                    <MenuItem>
                        {/* <p>
                                {book.book_id.title}
                                <span>{book.sub_total}</span>
                            </p> */}
                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Link
                                                to={`/book/${
                                                    book.book_id.ISBN13
                                                }`}
                                            >
                                                {book.book_id.title}
                                            </Link>
                                        </td>
                                        <td>{book.order_quantity}</td>
                                        <td>{book.sub_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </MenuItem>
                )}
                {/* {(cart.items < 1 && <MenuItem>No Item In Cart</MenuItem>) ||
                    cart.items.map(cartItem => (
                        <MenuItem description={cartItem.qty}>
                            <p>
                                {cartItem.id} <span>{cartItem.price}</span>
                            </p>
                        </MenuItem>
                    ))} */}
                <MenuItem divider />
                <MenuItem>
                    <Link to="/checkout">Checkout</Link>
                </MenuItem>
            </NavDropdown>
        );
    }
}

export default CartDropdown;
