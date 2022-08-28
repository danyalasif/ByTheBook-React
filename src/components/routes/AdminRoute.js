import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const AdminRoute = ({
    isAuthenticated,
    component: Component,
    user,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated && user.username === 'admin' ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

AdminRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps)(AdminRoute));
