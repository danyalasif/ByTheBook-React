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

class CreateAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authors: [],
            authorData: {
                author_name: '',
                description: '',
                dob: '',
                genre: []
            }
        };
    }

    handleSubmit = () => {
        axios.post('/api/createauthor', this.state.authorData).then({});
    };

    handleUploadImage = e => {
        e.preventDefault();
        const { image } = this.state;

        let formData = new FormData();

        formData.append('author_image', image);

        axios.post('/api/uploadAuthorImage', formData).then(res => {});
    };

    handleChange = e => {
        switch (e.target.name) {
            case 'author_image':
                this.setState({ image: e.target.files[0] });
                break;
            default:
                this.setState({
                    authorData: {
                        ...this.state.authorData,
                        [e.target.name]: e.target.value
                    }
                });
        }
    };

    render() {
        return (
            <Grid style={{paddingTop: '2em'}}>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Author Name"
                                name="author_name"
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
                            Date of Birth
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="date"
                                name="dob"
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
                                name="author_image"
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
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.handleSubmit}>
                                Submit Author
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>
        );
    }
}

export default CreateAuthor;
