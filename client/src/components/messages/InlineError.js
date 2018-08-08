import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const InlineError = ({ text }) => (
    <Message style={{ backgroundColor: '#912d2b' }} header={text} />
);

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;
