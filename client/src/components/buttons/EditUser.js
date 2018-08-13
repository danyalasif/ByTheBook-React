import React, { Component } from 'react';
import {
    Button,
    Modal,
    Glyphicon,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Col
} from '../../../node_modules/react-bootstrap';
import axios from 'axios';

class EditUser extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            messages: '',
            userData: {
                description: '',
                image: ''
            }
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit = () => {
        axios
            .put('/api/users/editUser', { userData: this.state.userData })
            .then(res =>
                this.setState({
                    messages: { success: res.data.message.success },
                    show: false
                })
            );
    };

    handleUploadImage = e => {
        e.preventDefault();
        const { image } = this.state;

        let formData = new FormData();

        formData.append('user_image', image);

        axios.post('/api/users/uploadUserImage', formData).then(res => {});
    };

    handleChange = e => {
        switch (e.target.name) {
            case 'user_image':
                console.log(e.target.files);
                this.setState({ image: e.target.files[0] });
                break;
            default:
                this.setState({
                    userData: {
                        ...this.state.userData,
                        [e.target.name]: e.target.value
                    }
                });
        }
    };

    render() {
        const { messages } = this.state;
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.handleShow}
                    style={{ float: 'right' }}
                >
                    <Glyphicon glyph="wrench" />
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
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
                                    Image
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        onChange={this.handleChange}
                                        name="user_image"
                                        type="file"
                                    />
                                    <Button onClick={this.handleUploadImage}>
                                        Upload
                                    </Button>
                                    {messages.success && messages.sucess}
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button onClick={this.handleSubmit}>
                                        Save
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default EditUser;
