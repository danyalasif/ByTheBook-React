import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import axios from 'axios';

const timeoutLength = 2000;

class AddToReadlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInReadlist: false,
            message: {},
            loading: true
        };
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.bookInReadlist(this.props.isbn);
        } else {
            this.setState({ loading: false });
        }
    }

    bookInReadlist = isbn => {
        axios
            .get(`/api/users/isInReadlist/${isbn}`)
            .then(res =>
                this.setState({
                    isInReadlist: res.data.isInReadlist,
                    loading: false
                })
            )
            .catch(err => console.log(err));
    };

    addBookToReadlist = isbn => {
        axios
            .post('/api/users/readlist', {
                isbn: isbn
            })
            .then(res =>
                this.setState({
                    message: res.data.message,
                    isInReadlist: res.data.isInReadlist
                })
            );
    };

    handleClick = () => {
        if (this.props.isAuthenticated) {
            this.addBookToReadlist(this.props.isbn);
        } else {
            this.setState({
                message: { notLoggedIn: 'Log In or Sign Up To Add' }
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    message: {}
                });
            }, timeoutLength);
        }
    };

    render() {
        const { message, isInReadlist, loading } = this.state;
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
                    icon={isInReadlist ? 'delete' : 'bookmark'}
                    content={
                        isInReadlist
                            ? 'Remove from Readlist'
                            : 'Add To Readlist'
                    }
                    color={isInReadlist ? 'red' : 'green'}
                    labelPosition="left"
                />
            </React.Fragment>
        );
    }
}

export default AddToReadlist;
