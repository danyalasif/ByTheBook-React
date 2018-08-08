import React, { Component } from 'react';
import {
    TextArea,
    Segment,
    Header,
    Rating,
    Button,
    Form,
    Message
} from 'semantic-ui-react';
import InlineError from './messages/InlineError';
import InlineSuccess from './messages/InlineSuccess';
import api from '../api';
class ReviewBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: '',
            messages: {}
        };
    }
    submitReview = () => {
        api.user
            .review({
                username: this.props.username,
                isbn: this.props.isbn,
                review: this.state.review,
                rating: this.state.rating
            })
            .then(success => {
                console.log(success);
                this.setState({
                    messages: { reviewSuccess: success.reviewSuccess }
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    messages: { reviewError: err.response.data.error }
                });
            });
    };
    onReviewChange = e => {
        this.setState({
            review: e.target.value
        });
    };

    onRatingChange = (e, { rating }) => {
        this.setState({
            rating
        });
    };

    render() {
        const { messages } = this.state;
        return (
            <Segment.Group>
                <Segment>
                    <Header size="large">Write a Review</Header>
                </Segment>
                {messages.reviewError && (
                    <InlineError text={messages.reviewError} />
                )}

                {messages.reviewSuccess && (
                    <InlineSuccess text={messages.reviewSuccess} />
                )}
                <Segment>
                    <Form>
                        <TextArea
                            autoHeight
                            placeholder="Write a review"
                            style={{ fontSize: '20px' }}
                            onChange={this.onReviewChange}
                            value={this.state.review}
                        />
                        <Rating
                            icon="star"
                            defaultRating={0}
                            maxRating={5}
                            onRate={this.onRatingChange}
                        />
                        <Button
                            style={{ margin: '10px' }}
                            onClick={this.submitReview}
                        >
                            Submit
                        </Button>
                    </Form>
                </Segment>
            </Segment.Group>
        );
    }
}

export default ReviewBox;
