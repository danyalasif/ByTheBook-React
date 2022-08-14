import React, { Component } from 'react';
import _ from 'lodash';
import AddToCart from '../buttons/AddToCart';

import Link from 'react-router-dom/Link';
import { Rating } from 'semantic-ui-react';
import { Thumbnail, Col, Well } from 'react-bootstrap';
import EditButton from '../buttons/EditButton';
// import { Carousel } from 'react-responsive-carousel';
// import { AddToCart } from 'react-redux-shopping-cart';

class NewReleases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'All Genres',
            filteredBooks: []
        };
    }

    componentDidMount() {
        this.setState({
            filteredBooks: this.filterByGenre('All Genres')
        });
    }

    handleItemClick = (e, { name }) =>
        this.setState({
            activeItem: name,
            filteredBooks: this.filterByGenre(name)
        });
    filterByGenre = genre => {
        if (genre === 'All Genres') {
            return this.props.books;
        }
        const re = new RegExp(_.escapeRegExp(genre), 'i');
        const isMatch = result => re.test(result.genre);

        return _.filter(this.props.books, isMatch);
    };

    render() {
        const { isAuthenticated, user, cart } = this.props;
        const { filteredBooks } = this.state;
        return (
            <React.Fragment>
                <Well>
                    <h1>New Releases</h1>
                </Well>
                {filteredBooks &&
                    filteredBooks.length <= 0 && <span> No Books Found </span>}
                {filteredBooks &&
                    filteredBooks.map(book => (
                        <Col xs={12} md={3}>
                            {isAuthenticated &&
                                user.username === 'admin' && (
                                    <EditButton book={book} />
                                )}
                            <div
                            >
                                <img
                                    src={`${book.book_img}`}
                                    alt={book.title}
                                    style={{
                                        width: book.book_img.naturalWidth + 'px',
                                        height: "250px",
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                    }}
                                    async
                                    key={book._id}
                                />
                                <h3>
                                    <Link to={`/book/${book.ISBN13}`}>
                                        {book.title.substring(0, 25)}
                                        {book.title.length > 25 ? '...' : ''}
                                    </Link>
                                </h3>
                                <Rating
                                    icon="star"
                                    rating={book.rating}
                                    maxRating={5}
                                    disabled
                                />
                                <p>
                                    {/* <AddToCart
                                        isbn={book._id}
                                        isAuthenticated={isAuthenticated}
                                    /> */}
                                    <AddToCart book={book} cart={cart} />
                                </p>
                            </div>
                        </Col>
                    ))}
            </React.Fragment>
        );
    }
}

export default NewReleases;
