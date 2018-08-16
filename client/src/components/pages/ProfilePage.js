import React, { Component } from 'react';
import {
    Header,
    Message,
    Segment,
    Container,
    Menu,
    Rating,
    Card,

    Dimmer,
    Loader
} from 'semantic-ui-react';

import { connect } from 'react-redux';
// import * as actions from '../../actions/auth';
// import faker from 'faker';
import { Thumbnail, Image } from 'react-bootstrap';
import EditUser from '../buttons/EditUser';
import api from '../../api';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlistLoading: true,
            wishlist: [],
            readlistLoading: true,
            readlist: [],
            userInfoLoading: true,
            userInfo: ''
        };
    }

    componentDidMount() {
        api.user
            .wishlist()
            .then(res => {
                this.setState({ wishlist: res, wishlistLoading: false });
                console.log(res);
            })
            .catch(err => console.log(err));

        api.user
            .readlist()
            .then(res => {
                this.setState({ readlist: res, readlistLoading: false });
                console.log(res);
            })
            .catch(err => console.log(err));

        axios
            .get('/api/users/user')
            .then(res => {
                this.setState({ userInfo: res.data });
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    render() {
        const {
            wishlistLoading,
            wishlist,
            readlistLoading,
            readlist,
            userInfo
        } = this.state;
        const { user } = this.props;
        console.log(user);
        return (
            <Container style={{ marginTop: '10em' }}>
                <EditUser />
                <Header as="h1">{user.username}'s Profile</Header>
                <Thumbnail src={`${userInfo.user_img}`}                 alt={user.username}
                style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
               />
                {/* <Image src={`${
                                        userInfo.user_img
                                    }`} /> */}
                {userInfo.about}
                <Menu size="massive">
                    <Menu.Item
                        as={Link}
                        to={`/${user.username}/wishlist`}
                        header
                        position="left"
                        size="massive"
                    >
                        Wishlist
                    </Menu.Item>
                </Menu>
                <Segment color="green">
                    <Dimmer active={wishlistLoading}>
                        <Loader />
                    </Dimmer>

                    <Card.Group>
                        {(!wishlist.length && (
                            <Message header="No books yet :(" />
                        )) ||
                            wishlist.slice(0, 4).map(book => (
                                <Card key={book.ISBN13}>
                                    <Image
                                        style={{
                                            width: '200px',
                                            margin: 'auto'
                                        }}
                                        src={`${
                                            book.book_img
                                        }`}
                                    />
                                    <Card.Content>
                                        <Card.Header>
                                            {' '}
                                            <Link to={`/book/${book.ISBN13}`}>
                                                {book.title}
                                            </Link>{' '}
                                        </Card.Header>
                                        <Card.Meta>
                                            <span className="date">
                                                {book.publish_date}
                                            </span>
                                        </Card.Meta>
                                        <Card.Description>
                                            <Rating
                                                icon="star"
                                                defaultRating={book.rating}
                                                maxRating={5}
                                                disabled
                                            />
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                    </Card.Group>
                </Segment>
                <Menu size="massive">
                    <Menu.Item
                        as={Link}
                        to={`/${user.username}/readlist`}
                        header
                        position="left"
                        size="massive"
                    >
                        Readlist
                    </Menu.Item>
                </Menu>
                <Segment color="green">
                    <Dimmer active={readlistLoading}>
                        <Loader />
                    </Dimmer>

                    <Card.Group>
                        {(!readlist.length && (
                            <Message header="No books yet :(" />
                        )) ||
                            readlist.slice(0, 4).map(book => (
                                <Card key={book.ISBN13}>
                                    <Image
                                        style={{
                                            width: '200px',
                                            margin: 'auto'
                                        }}
                                        src={`${
                                            book.book_img
                                        }`}
                                    />
                                    <Card.Content>
                                        <Card.Header>
                                            {' '}
                                            <Link to={`/book/${book.ISBN13}`}>
                                                {book.title}
                                            </Link>{' '}
                                        </Card.Header>
                                        <Card.Meta>
                                            <span className="date">
                                                {book.publish_date}
                                            </span>
                                        </Card.Meta>
                                        <Card.Description>
                                            <Rating
                                                icon="star"
                                                defaultRating={book.rating}
                                                maxRating={5}
                                                disabled
                                            />
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                    </Card.Group>
                </Segment>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        user: state.user
    };
}

export default connect(mapStateToProps)(ProfilePage);
