import React, { Component } from 'react';
import axios from 'axios';
import {
    AddToCart as ReduxAddToCart,
    RemoveFromCart
} from 'react-redux-shopping-cart';
class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            quantity: 1
        };
    }
    updateCart = e => {
        setTimeout(() => {
            console.log('CLICKED!!!!');
            this.setState({ loading: true });
            axios.post('/api/cart/updateCart', { cart: this.props.cart.items });
        }, 1000);
    };

    render() {
        const { book, cart } = this.props;
        const styles = `
        border: none;
        color: #ffffff !important;
        font-weight: 700;
        padding: 10px;
        text-transform: uppercase;
        border-radius: 6px;
        display: inline-block;
        `;
        //TODO: Convert the Cart Button to quantities when it is in cart,  otherwise just show the cart button
        return (
            <div  style={{marginLeft: '10px'}}>
                {cart &&
                cart.items.length > 0 &&
                cart.items.some(e => e.id === book._id) ? (
                    <React.Fragment>
                        <div onClick={this.updateCart}>
                            <RemoveFromCart
                                item={{
                                    id: book._id
                                }}
                                styles={
                                    styles +
                                    `background-color: #B80F28;  box-shadow: 1px 2px #B80F28;`
                                }
                                onClick={this.updateCart}
                            />
                        </div>
                    </React.Fragment>
                ) : (
                    <div onClick={this.updateCart}>
                        <ReduxAddToCart
                            item={{
                                id: book._id,
                                price: book.price,
                                qty: this.state.quantity
                            }}
                            disabled={book.quantity <= 0 ? true : false}
                            text={
                                book.quantity <= 0
                                    ? 'Out of Stock'
                                    : 'Add To Cart'
                            }
                            styles={
                                styles +
                                `background-color: #119e4d; box-shadow: 1px 2px #119e4d;`
                            }
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default AddToCart;