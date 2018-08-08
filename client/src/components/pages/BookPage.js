import React, { Component } from 'react';
import {
    Header,
    Segment,
    Container,
    Image,
    Rating,
    Icon,
    Button,
    Form,
    Label,
    List
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ReviewBox from '../ReviewBox';
import LoadReviews from '../LoadReviews';
import AddToWishlist from '../buttons/AddToWishlist';
import AddToReadlist from '../buttons/AddToReadlist';
import AddToCart from '../buttons/AddToCart';
import EditButton from '../buttons/EditButton';
import { Grid, Row, Col, Well } from '../../../node_modules/react-bootstrap';

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
        const { loading, book, bookRating } = this.state;
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
                {!loading && 
                
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
                
                }
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

{
    /* <Container style={{ marginTop: '8em', marginBottom: '10em' }}>
                {!loading && (
                    <Segment.Group loading>
                        <Segment>
                            <Header size="huge">
                                {book.title} by{' '}
                                {!loading && (
                                    <Link to={`/author/${book.author.name}`}>
                                        {book.author.name}
                                    </Link>
                                )}
                            </Header>
                            <Rating
                                icon="star"
                                rating={bookRating}
                                maxRating={5}
                                disabled
                            />
                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <Image
                                    size="large"
                                    src={`http://localhost:3001${
                                        book.book_img
                                    }`}
                                    alt={book.title}
                                />
                            </Segment>
                            <Segment>
                                <List>
                                    {book.genre.map(genre => (
                                        <List.Item key={genre}>
                                            <Link to={`/genre/${genre}`}>
                                                {genre}
                                            </Link>
                                        </List.Item>
                                    ))}
                                </List>

                                <List size="large">
                                    <List.Item>
                                        Publish Date: {book.publish_date}
                                    </List.Item>
                                    <List.Item>
                                        Publisher: {book.publisher}
                                    </List.Item>
                                    <List.Item>
                                        Availability:{' '}
                                        {book.quantity > 0
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </List.Item>
                                    <List.Item>
                                        Language: {book.language}
                                    </List.Item>
                                </List>
                            </Segment>
                            <Segment>
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

                                {isAuthenticated &&
                                    user.username === 'admin' && (
                                        <EditButton book={book} />
                                    )}
                            </Segment>
                        </Segment.Group>

                        <Segment>
                            <Header size="large">Description</Header>
                            <p style={{ fontSize: '20px' }}>
                                {book.description}
                            </p>
                        </Segment>
                        <Segment.Group vertical>
                            <Segment>
                                <ReviewBox
                                    username={user.username}
                                    isbn={book.ISBN13}
                                />
                            </Segment>
                            <Segment>
                                <LoadReviews
                                    isbn={book.ISBN13}
                                    username={user.username}
                                />
                            </Segment>
                        </Segment.Group>
                    </Segment.Group>
                )}
            </Container>*/
}
