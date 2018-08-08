import React, { Component } from 'react';
import {
    Header,
    Segment,
    Container,
    Image,
    Grid,
    Card,
    Rating,
    Icon,
    Button,
    Form
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
const imgStyles = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
};
class AuthorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            author: [],
            books: []
        };
    }

    componentDidMount() {
        this.getAuthorInfo(this.props.match.params.authorName);
        // this.getReviews(this.props.match.params.isbn);
    }

    getAuthorInfo = authorName => {
        axios
            .get(`/api/author/${authorName}`)
            .then(res => {
                this.setState({
                    author: res.data.author,
                    books: res.data.books,
                    loading: false
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        const { author, loading, books } = this.state;

        return (
            <Container style={{ marginTop: '10em' }}>
                <Segment.Group>
                    <Segment>
                        <Header size="huge">{author.name}</Header>
                        {/* <Rating
                            icon="star"
                            rating={bookRating}
                            maxRating={5}
                            disabled
                        /> */}
                    </Segment>
                    <Segment.Group horizontal>
                        <Segment>
                            <Image
                                size="large"
                                src={`http://localhost:3001${
                                    author.author_img
                                }.jpg`}
                                alt={author.name}
                            />
                        </Segment>
                    </Segment.Group>

                    <Segment>
                        <Header size="large">Description</Header>
                        <p style={{ fontSize: '20px' }}>{author.description}</p>
                    </Segment>
                    <Segment>
                        <Button color="facebook">
                            <Icon name="facebook" /> Facebook
                        </Button>
                        <Button color="twitter">
                            <Icon name="twitter" /> Twitter
                        </Button>
                        <Button color="google plus">
                            <Icon name="google plus" /> Google Plus
                        </Button>
                        <Button color="vk">
                            <Icon name="vk" /> VK
                        </Button>
                        <Button color="linkedin">
                            <Icon name="linkedin" /> LinkedIn
                        </Button>
                        <Button color="instagram">
                            <Icon name="instagram" /> Instagram
                        </Button>
                        <Button color="youtube">
                            <Icon name="youtube" /> YouTube
                        </Button>
                    </Segment>

                    <Segment.Group vertical>
                        <Segment color="red">
                            <Header size="large">Books by this author</Header>
                            <Grid columns={6} divided>
                                <Grid.Row>
                                    {books.map((book, index) => (
                                        <Grid.Column
                                            width={5}
                                            celled="internally"
                                        >
                                            <Card>
                                                <img
                                                    src={`http://localhost:3001${
                                                        book.book_img
                                                    }`}
                                                    alt={book.title}
                                                    style={imgStyles}
                                                />
                                                <Card.Content>
                                                    <Card.Header>
                                                        <Link
                                                            to={`/book/${
                                                                book.ISBN13
                                                            }`}
                                                        >
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
                                                            rating={book.rating}
                                                            maxRating={5}
                                                            disabled
                                                        />
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    ))}
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Segment.Group>
                </Segment.Group>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        user: state.user
    };
}

export default connect(mapStateToProps)(AuthorProfile);
