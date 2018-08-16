import React, { Component } from 'react';
import NewReleases from '../book-components/NewReleases';

import BookCarousal from '../book-components/BookCarousal';
import TopRated from '../book-components/TopRated';
// import BestAuthors from '../BestAuthors';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import connect from '../../../node_modules/react-redux/lib/connect/connect';
import CategoryList from '../book-components/CategoryList';

// import { Container, Row, Col } from 'reactstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            topRatedBooks: [],
            loading: true
        };
    }

    componentDidMount() {
        axios.get('/api/').then(res =>
            this.setState({
                books: res.data,
                loading: false
            })
        );
    }

    render() {
        const { books, loading } = this.state;
        const { isAuthenticated, user, cart } = this.props;
        return (
            <div>
                {!loading && (
                    <React.Fragment>
                        <Grid fluid>
                            <Row className="show-grid">
                                <Col xsHidden smHidden md={12}>
                                    <BookCarousal books={books} />
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col xs={4} md={2}>
                                    {/* <AwardWinners
                                        books={books}
                                        isAuthenticated={isAuthenticated}
                                        user={user}
                                    /> */}
                                    <CategoryList
                                        books={books}
                                        isAuthenticated={isAuthenticated}
                                        user={user}
                                    />
                                </Col>
                                <Col xs={4} md={8}>
                                    <NewReleases
                                        books={books}
                                        isAuthenticated={isAuthenticated}
                                        user={user}
                                        cart={cart}
                                    />
                                </Col>
                                <Col xs={4} md={2}>
                                    <TopRated
                                        books={books}
                                        isAuthenticated={isAuthenticated}
                                        user={user}
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </React.Fragment>
                )}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        user: state.user,
        cart: state.cart
    };
}

export default connect(mapStateToProps)(HomePage);
