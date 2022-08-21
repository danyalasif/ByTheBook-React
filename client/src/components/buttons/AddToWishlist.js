import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

import axios from 'axios';

class AddToWishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInWishlist: false,
            message: {},
            loading: true
        };
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.isBookInWishlist(this.props.isbn);
        } else {
            this.setState({ loading: false });
        }
    }

    isBookInWishlist = (isbn) => {
        axios
            .get(`/api/users/isInWishlist/${isbn}`)
            .then(res =>
                this.setState({
                    isInWishlist: res.data.isInWishlist,
                    loading: false
                })
            )
            .catch(err => console.log(err)).finally(() => {
                this.setState({ loading: false })
            });
    };
    addBookToWishlist = (isbn) => {
        axios
            .post('/api/users/wishlist', {
                isbn: isbn
            })
            .then(res =>
                this.setState({
                    message: res.data.message,
                    isInWishlist: res.data.isInWishlist
                })
            );
    };
    handleClick = () => {
        if (this.props.isAuthenticated) {
            this.addBookToWishlist(this.props.isbn);
        } else {
            this.setState({
                message: { notLoggedIn: 'Log In or Sign Up To Add' }
            });
        }
    };

    render() {
        const { message, isInWishlist, loading } = this.state;
        return (
            <React.Fragment>
                {!loading &&
                    message.notLoggedIn && (
                        <InlineError text={message.notLoggedIn} />
                    )}
                <Button
                    style={{ display: 'block', margin: '10px' }}
                    loading={loading}
                    onClick={this.handleClick}
                    size="large"
                    icon={isInWishlist ? 'delete' : 'add'}
                    content={
                        isInWishlist
                            ? 'Remove from Wishlist'
                            : 'Add To Wishlist'
                    }
                    color={isInWishlist ? 'red' : 'green'}
                    labelPosition="left"
                />
            </React.Fragment>
        );
    }
}

export default AddToWishlist;
