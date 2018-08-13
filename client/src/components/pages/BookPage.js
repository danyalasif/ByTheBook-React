import React, { Component } from 'react';
import { Image, Rating, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ReviewBox from '../ReviewBox';
import LoadReviews from '../LoadReviews';
import AddToWishlist from '../buttons/AddToWishlist';
import AddToReadlist from '../buttons/AddToReadlist';
import AddToCart from '../buttons/AddToCart';
import EditButton from '../buttons/EditButton';
import { Grid, Row, Col } from '../../../node_modules/react-bootstrap';

class BookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            book: [],
            reviews: [],
            bookRating: 0
        };
    }

    componentDidMount() {
        this.getBookInfo(this.props.match.params.isbn);
        this.getReviews(this.props.match.params.isbn);
    }

    getReviews = isbn => {
        axios
            .get(`/api/reviews/${isbn}`)
            .then(res => {
                this.setState({ reviews: res.data });
                this.calculateBookRating();
            })
            .catch(err => console.log(err));
    };

    getBookInfo = isbn => {
        axios
            .get(`/api/${isbn}`)
            .then(res => {
                this.setState({ book: res.data, loading: false });
            })
            .catch(err => console.log(err));
    };

    // calculateBookRating = () => {
    //     let bookRating = 0;
    //     this.state.reviews.map(review => {
    //         bookRating += review.rating;
    //     });

    //     bookRating = bookRating / this.state.reviews.length;
    //     this.setState({ bookRating });
    // };

    render() {
        const { loading, book } = this.state;
        const { user, isAuthenticated, cart } = this.props;
        return (
            <Grid style={{ marginTop: '8em', marginBottom: '10em' }}>
                {!loading && (
                    <Row className="show-grid">
                        <Col xs={12} md={2}>
                            {isAuthenticated &&
                                user.username === 'admin' && (
                                    <EditButton book={book} />
                                )}
                            <Image
                                src={`http://localhost:3001${book.book_img}`}
                                rounded
                            />
                            <AddToWishlist
                                username={user.username}
                                isbn={book.ISBN13}
                                isAuthenticated={isAuthenticated}
                            />
                            <AddToReadlist
                                username={user.username}
                                isbn={book.ISBN13}
                                isAuthenticated={isAuthenticated}
                            />
                            <AddToCart book={book} cart={cart} />
                        </Col>
                        <Col xs={12} md={6}>
                            <h1>{book.title}</h1>
                            <h3>
                                by{' '}
                                <Link to={`/author/${book.author.name}`}>
                                    {book.author.name}
                                </Link>{' '}
                            </h3>
                            <Rating
                                icon="star"
                                rating={book.rating}
                                maxRating={5}
                                disabled
                            />{' '}
                            {book.rating.toFixed(2)}
                        </Col>
                        <Col xs={12} md={4}>
                            <h3>Genre</h3>
                            <div>
                                {book.genre.map(genre => (
                                    <h2 style={{ marginTop: '-15px' }}>
                                        <Label>
                                            {' '}
                                            <Link to={`/genre/${genre}`}>
                                                {genre}
                                            </Link>
                                        </Label>
                                    </h2>
                                ))}
                            </div>
                        </Col>{' '}
                        <Col xs={12} md={8}>
                            <p style={{ fontSize: '20px' }}>
                                {book.description}
                            </p>
                        </Col>
                    </Row>
                )}
                {!loading && (
                    <Row style={{ margin: 'auto', marginTop: '2em' }}>
                        <Col xs={12} md={10}>
                            <ReviewBox
                                username={user.username}
                                isbn={book.ISBN13}
                            />
                        </Col>
                        <Col xs={12} md={8} style={{ marginTop: '2em' }}>
                            <LoadReviews
                                isbn={book.ISBN13}
                                username={user.username}
                            />
                        </Col>
                    </Row>
                )}
            </Grid>
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

export default connect(mapStateToProps)(BookPage);
