import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react';

// import Validator from 'validator';
import InlineError from '../messages/InlineError';
// import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    state = {
        data: {
            username: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    handleChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.data).catch(err => {
                this.setState({
                    errors: { global: err.response.data.error },
                    loading: false
                });
            });
        }
    };

    validate = data => {
        const errors = {};
        if (!data.username.trim()) errors.username = "Can't be blank";
        if (!data.password) errors.password = "Can't be blank";

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;
        return (
            <div className="login-form">
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="top"
                >
                    <Grid.Column>
                        <Header as="h2" color="teal" textAlign="center">
                            Log-in to your account
                        </Header>
                        <Form size="massive" loading={loading}>
                            <Segment stacked>
                                {errors.global && (
                                    <InlineError text={errors.global} />
                                )}
                                <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username (Required)"
                                    id="username"
                                    type="username"
                                    value={data.username}
                                    onChange={this.handleChange}
                                    name="username"
                                    autoComplete="true"
                                    required
                                    error={!!errors.username}
                                />
                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password (Required)"
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={this.handleChange}
                                    name="password"
                                    autoComplete="false"
                                    required
                                    error={!!errors.password}
                                />
                                {errors.password && (
                                    <InlineError text={errors.password} />
                                )}

                                <Button
                                    color="teal"
                                    fluid
                                    size="large"
                                    onClick={e => this.onSubmit(e)}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

LoginForm.propTypes = {};

export default LoginForm;
