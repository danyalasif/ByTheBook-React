import React from 'react';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
// import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Glyphicon } from 'react-bootstrap';

class LoginPage extends React.Component {
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
        this.props
            .login(data)
            .then(() => this.props.history.push(`/profile/${data.username}`));

    render() {
        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.handleShow}
                >
                    <Glyphicon glyph="log-in" /> Login
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Welcome Back! Login.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm submit={this.submit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        username: state.user.username
    };
}
export default withRouter(
    connect(
        mapStateToProps,
        { login }
    )(LoginPage)
);
