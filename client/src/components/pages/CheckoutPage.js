import React, { Component } from 'react';
import {
    Item,
    Container,
    Segment,
    Message,
    Label,
    Button,
    Input
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import InlineSuccess from '../messages/InlineSuccess';
import { Link } from 'react-router-dom';
import AddToCart from '../buttons/AddToCart';

import { DecreaseQty, IncreaseQty, ClearCart } from 'react-redux-shopping-cart';

class CheckoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
            messages: {},
            checkoutLoading: false
        };
    }

    componentDidMount() {
        axios
            .get('/api/cart/checkout')
            .then(res => {
                this.setState({ books: res.data, loading: false });
                console.log(this.state);
            })
            .catch(err => console.log(err));
        // console.log(this.props.cart.items);
        // this.updateCart();
    }

    updateCart = () => {
        axios
            .post('/api/cart/updateCart', { cart: this.props.cart.items })
            .then(res => this.setState({ books: res.data, loading: false }))
            .catch(err => console.log(err));
    };

    handleCheckout = () => {
        this.setState({ checkoutLoading: true });
        axios
            .post('/api/cart/checkout')
            .then(res => {
                this.setState({
                    messages: { success: res.data },
                    checkoutLoading: false
                });
            })
            .catch(err =>
                this.setState({
                    messages: { error: 'Unable to Comply Building in Progress' }
                })
            );
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { books, loading, messages, checkoutLoading } = this.state;
        const { cart } = this.props;
        const generalStyles = `
        border: none;
        font-weight: 700;
        padding: 10px;
        text-transform: uppercase;
        border-radius: 6px;
        display: inline-block;
        width: 5em;
        `;
        const incrementStyles = `
       
        color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
        `;

        const decrementStyles = `
        color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;

        `;
        return (
            <Container style={{ marginTop: '10em', marginBottom: '10em' }}>
                <Segment.Group>
                    <Segment loading={loading} horizontal>
                        {messages.success && (
                            <InlineSuccess
                                text={`${
                                    messages.success.success
                                }, Your Order Id is ${
                                    messages.success.order_id
                                }`}
                            />
                        )}
                        <Item.Group divided>
                            {!loading && books.length < 1 ? (
                                <Message>Nothing In Cart :( </Message>
                            ) : (
                                books.map(book => (
                                    <Item>
                                        <Item.Image
                                            src={`http://localhost:3001${
                                                book.book_id.book_img
                                            }`}
                                            alt={book.book_id.title}
                                        />

                                        <Item.Content>
                                            <Item.Header
                                                as={Link}
                                                to={`/book/${
                                                    book.book_id.ISBN13
                                                }`}
                                            >
                                                {book.book_id.title}
                                            </Item.Header>
                                            <Item.Description
                                                style={{ marginRight: '4em' }}
                                            >
                                                {book.book_id.description}
                                            </Item.Description>
                                            <Item.Extra>
                                                {book.book_id.genre.map(
                                                    genre => (
                                                        <Label>{genre}</Label>
                                                    )
                                                )}
                                            </Item.Extra>

                                            <Item.Extra>
                                                {cart.items
                                                    .filter(
                                                        x =>
                                                            x.id ===
                                                            book.book_id._id
                                                    )
                                                    .map(
                                                        y =>
                                                            y.qty <= 5 ? (
                                                                <IncreaseQty
                                                                    itemId={
                                                                        book
                                                                            .book_id
                                                                            ._id
                                                                    }
                                                                    styles={
                                                                        generalStyles +
                                                                        incrementStyles
                                                                    }
                                                                />
                                                            ) : (
                                                                <Button
                                                                    disabled
                                                                    type="number"
                                                                    styles={
                                                                        generalStyles +
                                                                        incrementStyles +
                                                                        `background-color: red`
                                                                    }
                                                                >
                                                                    No Quantity{' '}
                                                                </Button>
                                                            )
                                                    )}

                                                <DecreaseQty
                                                    itemId={book.book_id._id}
                                                    styles={
                                                        generalStyles +
                                                        decrementStyles
                                                    }
                                                />
                                            </Item.Extra>
                                            <Item.Extra>
                                                <Input
                                                    label="Quantity"
                                                    type="number"
                                                    postion="right"
                                                    actionPosition="left"
                                                    placeholder="0"
                                                    name="quantity"
                                                    value={cart.items
                                                        .filter(
                                                            x =>
                                                                x.id ===
                                                                book.book_id._id
                                                        )
                                                        .map(y => y.qty)}
                                                    onChange={this.handleChange}
                                                    style={{
                                                        appearance: 'none'
                                                    }}
                                                />
                                            </Item.Extra>
                                            <Item.Extra>
                                                <Input
                                                    label="Rs."
                                                    type="number"
                                                    postion="right"
                                                    actionPosition="left"
                                                    placeholder="0"
                                                    value={cart.items
                                                        .filter(
                                                            x =>
                                                                x.id ===
                                                                book.book_id._id
                                                        )
                                                        .map(y => y.subTotal)}
                                                />
                                            </Item.Extra>
                                            <Item.Extra floated="right">
                                                <AddToCart
                                                    book={book.book_id}
                                                    cart={cart}
                                                />{' '}
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                ))
                            )}
                        </Item.Group>
                    </Segment>
                    <Segment style={{ float: 'right' }}>
                        <Button
                            loading={checkoutLoading}
                            color="teal"
                            labelPosition="left"
                            icon="cart"
                            content="Checkout"
                            onClick={this.handleCheckout}
                        />
                        <Input
                            type="number"
                            postion="right"
                            actionPosition="left"
                            placeholder="Search..."
                            value={cart.total}
                        />

                        <Button
                            loading={checkoutLoading}
                            color="teal"
                            labelPosition="left"
                            icon="cart"
                            content="Update Cart"
                            onClick={this.updateCart}
                        />

                        <ClearCart />
                    </Segment>
                </Segment.Group>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}

export default connect(mapStateToProps)(CheckoutPage);

