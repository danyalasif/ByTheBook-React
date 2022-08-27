import React from 'react';
// import faker from 'faker';

import { ListGroupItem, ListGroup, Well } from 'react-bootstrap';
import { Rating } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AwardWinners = ({ books }) => (
    <ListGroup style={{ fontSize: '20px' }}>
        <Well>
            <h2>Most Reviewed Books</h2>
        </Well>
        {(!books.length && <h1>No Books </h1>) ||
            (books.length > 0 &&
                books
                    .filter(book => book.rating >= 0)
                    .slice(0, 10)
                    .map(book => (
                        <ListGroupItem
                            header={
                                <Link to={`/book/${book.ISBN13}`}>
                                    {book.title}
                                </Link>
                            }
                            key={book.ISBN13}
                        >
                            <Rating
                                icon="star"
                                rating={book.rating}
                                maxRating={5}
                                disabled
                            />
                        </ListGroupItem>
                    )))}
    </ListGroup>
);

export default AwardWinners;
