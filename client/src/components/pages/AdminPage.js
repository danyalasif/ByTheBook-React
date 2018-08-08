import React, { Component } from 'react';
import _ from 'lodash';
// import faker from 'faker';

import {
    Container,
    Image,
    Menu,
    Rating,
    Card,
    Icon,
    Button,
    Tab
} from 'semantic-ui-react';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid style={{ marginTop: '150px' }}>
                <Button>Add a Book</Button>
            </Container>
        );
    }
}

export default AdminPage;
