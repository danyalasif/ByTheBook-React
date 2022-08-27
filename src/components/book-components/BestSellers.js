import React from 'react';
// import faker from 'faker';

import {
    Container,
    Image,
    Menu,
    Rating,
    Card,
    Icon,
    Button
} from 'semantic-ui-react';

// import { Carousel } from 'react-responsive-carousel';

const genres = [
    'All Genres',
    'Business',
    'Fiction',
    'Biography',
    'Young Adult'
];

const BestSellers = ({ books }) => (
    <React.Fragment>
        <Menu size="massive">
            <Container fluid>
                <Menu.Item as="a" header position="left" size="massive">
                    Best Sellers
                </Menu.Item>
                {genres.map(genre => (
                    <Menu.Item
                        key={genre}
                        name={genre}

                        // color={genre}
                        // onClick={this.handleAClick}
                    />
                ))}
            </Container>
        </Menu>

        <Container fluid>
            <Card.Group>
                {books && books.map(book => (
                    <Card key={book.ISBN13}>
                        <Image
                            style={{ height: '300px' }}
                            src={`{book.book_img}`}
                        />
                        <Card.Content>
                            <Card.Header>{book.title}</Card.Header>
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
                            <Button basic color="green">
                                <Icon name="cart" />
                                Add To Card
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    </React.Fragment>
);

export default BestSellers;
