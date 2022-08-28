import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ReadlistPage extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        axios.get('/api/users/readlist').then(res => {
            this.setState({ books: res.data });
        });
    }

    render() {
        const { books } = this.state;
        return (
            <Grid>
                <Panel>
                    <Panel.Heading style={{ fontSize: '25px' }}>
                        <Panel.Title
                            componentClass="h2"
                            style={{ fontSize: '20px' }}
                        >
                            Readlist
                        </Panel.Title>
                    </Panel.Heading>
                </Panel>
                <Row>
                    {books.map(book => (
                        <Col xs={6} md={4}>
                            <Thumbnail
                                src={`${
                                    book.book_img
                                }`}
                                alt="242x200"
                            >
                                <h3>
                                    {' '}
                                    <Link to={`/book/${book.ISBN13}`}>
                                        {book.title}
                                    </Link>
                                </h3>
                                <p>{book.description.substring(0, 100)}...</p>
                            </Thumbnail>
                        </Col>
                    ))}
                </Row>
            </Grid>
        );
    }
}

export default ReadlistPage;
