import React, { Component } from 'react';
import axios from 'axios';
import {
    Form,
    FormGroup,
    Col,
    Button,
    ControlLabel,
    FormControl,
    Grid
} from 'react-bootstrap';

class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authors: [],
            bookData: {
                ISBN13: '',
                title: '',
                description: '',
                image: '',
                author: [],
                pages: '',
                genre: ''
            }
        };
    }

    componentDidMount() {
        axios
            .get('/api/authors')
            .then(res => this.setState({ authors: res.data, loading: false }));
    }

    handleSubmit = () => {
        axios.post('/api/createbook', this.state.bookData).then({});
    };

    handleUploadImage = e => {
        e.preventDefault();
        const { image } = this.state;

        let formData = new FormData();

        formData.append('book_image', image);

        axios.post('/api/uploadBookImage', formData).then(res => {});
    };

    handleChange = e => {
        switch (e.target.name) {
            case 'book_image':
                console.log(e.target.files);
                this.setState({ image: e.target.files[0] });
                break;
            case 'author':
                this.setState({
                    bookData: {
                        ...this.state.bookData,
                        author: [...this.state.bookData.author, e.author]
                    }
                });
                break;
            default:
                this.setState({
                    bookData: {
                        ...this.state.bookData,
                        [e.target.name]: e.target.value
                    }
                });
        }
    };

    render() {
        const { authors, loading } = this.state;
        return (
            <Grid style={{paddingTop: '2em'}}>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            ISBN13
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="number"
                                placeholder="13 Digit ISBN"
                                min="13"
                                max="13"
                                name="ISBN13"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Title
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="email"
                                placeholder="Book Title"
                                name="title"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="A very long description"
                                componentClass="textarea"
                                rows="5"
                                name="description"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Pages
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="number"
                                placeholder="Number of Pages"
                                min="1"
                                name="pages"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Image
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                onChange={this.handleChange}
                                name="book_image"
                                type="file"
                            />
                            <Button onClick={this.handleUploadImage}>
                                Upload
                            </Button>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Genre
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Add each genre with a ; in between"
                                name="genre"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="select"
                                multiple
                                name="author"
                                onChange={this.handleChange}
                            >
                                {!loading &&
                                    authors.map(author => (
                                        <option value={author._id}>
                                            {author.name}
                                        </option>
                                    ))}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.handleSubmit}>
                                Submit Book
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}

export default CreateBook;
