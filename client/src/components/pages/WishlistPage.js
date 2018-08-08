import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class WishlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        axios.get('/api/users/wishlist').then(res => {
            this.setState({ books: res.data });
        });
    }

    render() {
        const { books } = this.state;
        return (
            <Grid style={{ width: '90vw' }}>
                <Panel>
                    <Panel.Heading style={{ fontSize: '25px' }}>
                        <Panel.Title
                            componentClass="h2"
                            style={{ fontSize: '20px' }}
                        >
                            Wishlist
                        </Panel.Title>
                    </Panel.Heading>
                </Panel>
                <Row>
                    {books.map(book => (
                        <Col xs={6} md={2}>
                            <Thumbnail
                                src={`http://localhost:3001${
                                    book.book_img
                                }`}
                                alt="242x200"
                            >
                                <h3 style={{ fontSize: '20px' }}>
                                    {' '}
                                    <Link to={`/book/${book.ISBN13}`}>
                                        {book.title}
                                    </Link>
                                </h3>
                                <p style={{ fontSize: '17px' }}>
                                    {book.description.substring(0, 100)}...
                                </p>
                            </Thumbnail>
                        </Col>
                    ))}
                </Row>
            </Grid>
        );
    }
}

export default WishlistPage;
