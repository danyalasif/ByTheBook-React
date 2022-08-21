import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { removeFromCart, addProduct, updateCartThunk } from "../../actions/cart"
// import {
//     AddToCart as ReduxAddToCart,
//     RemoveFromCart
// } from 'react-redux-shopping-cart';
class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            quantity: 1
        };
    }
    updateCart = book => {
        setTimeout(() => {
            console.log({ book });
            this.setState({ loading: true });
            this.props.dispatch(updateCartThunk([book, ...this.props.cart.items]))
        }, 1000);
    };

    removeFromCart(book) {
        removeFromCart(this.props.book._id)
    }

    addToCart(book) {
        console.log("Add to cart,", book)
        this.props.dispatch(addProduct(book))
    }

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
            <div style={{ marginLeft: '10px' }}>
                {cart && cart.items &&
                    cart.items.length > 0 &&
                    cart.items.some(e => e.id === book._id) ? (
                    <React.Fragment>
                        <button>Remove from Cart</button>
                    </React.Fragment>
                ) : (

                    <button onClick={() => this.updateCart(book)}>Add to Cart</button>

                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        cart: state.cart
    };
}

export default connect(
    mapStateToProps
)(AddToCart);

{/*<div onClick={this.updateCart}>
                            
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
                        </div>*/}


{/* <ReduxAddToCart
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
                        /> */}