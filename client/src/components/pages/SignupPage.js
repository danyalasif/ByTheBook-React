import React from 'react';
import SignupForm from '../forms/SignupForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/users';
// import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { Modal, Button } from 'react-bootstrap';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { withRouter } from 'react-router-dom';
class SignupPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    submit = data =>
        this.props.signup(data).then(() => this.props.history.push('/'));

    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleShow}
                >
                    {/* <FontAwesomeIcon icon={faUserPlus} /> Sign Up */}
                    Sign Up
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Come on in. Sign Up!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SignupForm submit={this.submit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
};
function mapStateToProps(state) {
    return {
        username: state.user.username
    };
}
export default withRouter(
    connect(
        mapStateToProps,
        { signup }
    )(SignupPage)
);
