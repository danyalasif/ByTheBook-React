import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    };
}

export default withRouter(connect(mapStateToProps)(GuestRoute));
