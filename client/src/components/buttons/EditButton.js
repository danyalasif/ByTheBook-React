import React, { Component } from 'react';
import {
    Button,
    Glyphicon,
    FormGroup,
    FormControl,
    Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
class EditButton extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            bookData: {
...this.props.book
            }
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSaveButton = () => {
console.log("I'm being clicked")
        axios.put("/api/editBook", {bookData: this.state.bookData}).then(res => {this.setState({show: false})});
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
        const { book } = this.props;
        return (
            <div>
                <FontAwesomeIcon
                    icon={faWrench}
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleShow}
                    style={{ fontSize: '16px', cursor: 'pointer' }}
                />

                <Modal
                    bsSize="large"
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editing {book.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup bsSize="large">
                                ISBN13: <FormControl type="text" value={book.ISBN13} />
                            </FormGroup>
                            <FormGroup bsSize="large">
                                Description: <FormControl
                                    type="text"
                                    componentClass="textarea"
                                    name="description"
                                    onChange={this.handleChange}
                                >
                                    {book.description}
                                </FormControl>
                            </FormGroup>
                            <FormGroup bsSize="large">
                               Pages:  <FormControl type="number" name="pages" placeholder={book.pages} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup bsSize="large">
                                Price: <FormControl type="number" name="price" placeholder={book.price}  onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup bsSize="large">
                                Title: <FormControl type="text" name="title" placeholder={book.title} value={this.state.bookData.title} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup bsSize="large">
                            Rating:
                                <FormControl
                                    type="text"
                                    placeholder={book.rating}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup bsSize="large">
                            Quantity:
                                <FormControl
                                    type="text"
                                    placeholder={book.quantity}
                                    onChange={this.handleChange}
                                    name="quantity"
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={this.handleSaveButton}
                        >
                            Save Book
                        </Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditButton;
