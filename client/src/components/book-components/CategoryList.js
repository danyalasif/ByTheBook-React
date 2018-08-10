import React from 'react';
// import faker from 'faker';

import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroup, Well, Badge } from 'react-bootstrap';

const CategoryList = ({ books }) => {
    const genres = {};
    books.map(book => {
        book.genre.map(genre => {
            genres[genre] ? (genres[genre] += 1) : (genres[genre] = 1);
        });
    });
    Object.entries(genres).forEach(([key, value]) => console.log(key, value));
    return (
        <ListGroup style={{ fontSize: '20px' }}>
            <Well>
                <h2>Categories</h2>
            </Well>

            {Object.entries(genres).map(([key, value]) => (
                <ListGroupItem
                    header={<Link to={`/genre/${key}`}>{key}  <Badge>{value}</Badge></Link>}
                    key={key}
                >
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default CategoryList;
