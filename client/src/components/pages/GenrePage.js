import React, { Component } from 'react';
import { Thumbnail, Grid, Row, Col, Panel } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class GenrePage extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    componentDidMount() {
        axios.get(`/api/genre/${this.props.match.params.genre}`).then(res => {
            this.setState({ books: res.data });
        });
    }

    render() {
        const { books } = this.state;
        return (
            <Grid style={{ width: '90vw', paddingTop: '2em' }}>
                <Panel>
                    <Panel.Heading style={{ fontSize: '25px' }}>
                        <Panel.Title
                            componentClass="h2"
                            style={{ fontSize: '20px' }}
                        >
                            Genre: {this.props.match.params.genre}
                        </Panel.Title>
                    </Panel.Heading>
                </Panel>
                <Row>
                    {books.map(book => (
                        <Col xs={6} md={3}>
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

export default GenrePage;
