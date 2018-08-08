import React, { Component } from 'react';
import {
    TextArea,
    Segment,
    Header,
    Comment,
    Rating,
    Button,
    Modal,
    Form,
    Message,
    Icon
} from 'semantic-ui-react';
import api from '../api';
import axios from 'axios';
import InlineError from './messages/InlineError';
import InlineSuccess from './messages/InlineSuccess';
import faker from 'faker';

class LoadReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            message: {},
            editText: '',
            editLoading: false
        };
    }

    componentWillReceiveProps() {
        this.getReviews(this.props.isbn);
    }

    getReviews = isbn => {
        axios
            .get(`/api/reviews/${isbn}`)
            .then(res => {
                this.setState({ reviews: res.data });
            })
            .catch(err => console.log(err));
    };

    handleDeleteButton = review_id => {
        this.setState({ editLoading: true });
        axios
            .delete(`/api/reviews/${review_id}`)
            .then(res => {
                this.setState({
                    message: { success: res.data.message, editLoading: false }
                });

                this.getReviews(this.props.isbn);
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: { error: err.data.error } });
            });
    };

    handleEditButton = review_id => {
        axios
            .put(`/api/reviews/${review_id}`, { text: this.state.editText })
            .then(res => {
                this.setState({ message: { editSuccess: res.data.success } });
                this.getReviews(this.props.isbn);
            })
            .catch(err => {
                console.log(err);
                this.setState({ message: { editError: err.data.error } });
            });
    };
    handleEditText = e => {
        this.setState({ editText: e.target.value });
    };
    render() {
        const { reviews, message, editLoading } = this.state;
        const { username } = this.props;

        return (
            <Comment.Group size="massive">
                <Header as="h3" size="large" dividing>
                    All Reviews{' '}
                </Header>

                {reviews.map(review => (
                    <Comment>
                        <Comment.Avatar as="a" src={faker.image.image()} />
                        <Comment.Content>
                            <Comment.Author as="a">
                                {review.user_id.username}
                            </Comment.Author>
                            <Comment.Metadata>
                                <span>{review.createdAt}</span>
                            </Comment.Metadata>
                            <Comment.Metadata position="right">
                                <span>
                                    <Rating
                                        icon="star"
                                        defaultRating={review.rating}
                                        maxRating={5}
                                        disabled
                                    />
                                </span>
                            </Comment.Metadata>
                            <Comment.Text>{review.text}</Comment.Text>
                            {username === review.user_id.username ? (
                                <Comment.Actions>
                                    <Button
                                        color="red"
                                        onClick={e =>
                                            this.handleDeleteButton(
                                                review._id,
                                                e
                                            )
                                        }
                                    >
                                        <Icon name="delete" /> Delete
                                    </Button>

                                    <Modal
                                        trigger={
                                            <Button color="blue">
                                                <Icon name="edit" /> Edit
                                            </Button>
                                        }
                                    >
                                        <Modal.Header>
                                            Edit your comment
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Form>
                                                <TextArea
                                                    onChange={
                                                        this.handleEditText
                                                    }
                                                >
                                                    {review.text}
                                                </TextArea>
                                            </Form>
                                            <Button
                                                loading={editLoading}
                                                closeIcon
                                                color="green"
                                                onClick={e =>
                                                    this.handleEditButton(
                                                        review._id,
                                                        e
                                                    )
                                                }
                                            >
                                                Post
                                            </Button>
                                        </Modal.Content>
                                    </Modal>
                                    {message.error && (
                                        <InlineError text={message.error} />
                                    )}
                                    {message.success && (
                                        <InlineSuccess text={message.success} />
                                    )}
                                </Comment.Actions>
                            ) : null}
                        </Comment.Content>
                    </Comment>
                ))}
            </Comment.Group>
        );
    }
}

export default LoadReviews;
