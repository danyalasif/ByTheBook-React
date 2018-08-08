import React from 'react';
// import faker from 'faker';
// import Coverflow from 'react-coverflow';
import {
    Container,
    Rating,
    Card,
    Icon,
    Button,
    Grid,
    Menu,
    Segment
} from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import AddToCart from '../buttons/AddToCart';
const styles = {
    textAlign: 'center',
    marginTop: '100px'
};

const imgStyles = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
};
const cardStyles = {
    marginTop: '10px'
};
const RecommendedBooks = ({ books }) => (
    <Container fluid style={styles}>
        <Menu size="massive">
            <Container fluid>
                <Menu.Item as="a" header>
                    Recommended Books
                </Menu.Item>
            </Container>
        </Menu>
        <Segment>
            <Grid columns={6} divided>
                <Grid.Row>
                    {books.slice(0, 5).map((book, index) => (
                        <Grid.Column width={2} celled="internally">
                            <Card style={{ width: '500px', height: '500px' }}>
                                <img
                                    src={`http://localhost:3001${
                                        book.book_img
                                    }`}
                                    alt={book.title}
                                    style={imgStyles}
                                />
                                <Card.Content>
                                    <Card.Header>
                                        <Link to={`/book/${book.ISBN13}`}>
                                            {book.title}
                                        </Link>
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
                                <Card.Content extra>
                                    <AddToCart />
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </Segment>
    </Container>
);
export default RecommendedBooks;
