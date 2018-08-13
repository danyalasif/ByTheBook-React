import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Segment
} from 'semantic-ui-react';

import PropTypes from 'prop-types';

import { isEmail } from 'validator';
import InlineError from '../messages/InlineError';
// import PropTypes from 'prop-types';

class SignupForm extends React.Component {
    state = {
        data: {
            email: '',
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
        if (!isEmail(data.email)) errors.email = 'Invalid email';
        if (!data.username.trim()) errors.username = "Can't be blank";
        if (!data.password) errors.password = "Can't be blank";

        return errors;
    };

    render() {
        const { data, errors, loading } = this.state;
        return (
            <div className="register-form">
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="top"
                >
                    <Grid.Column>
                        <Header as="h2" color="teal" textAlign="center">
                            Register Your Account
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
                                {errors.username && (
                                    <InlineError text={errors.username} />
                                )}

                                <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Email Address (Required)"
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={this.handleChange}
                                    name="email"
                                    autoComplete="false"
                                    required
                                    error={!!errors.email}
                                />
                                {errors.email && (
                                    <InlineError text={errors.email} />
                                )}

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
                                    Register
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;
