import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

class OrderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        axios
            .get(`/api/users/orders`)
            .then(res => this.setState({ orders: res.data }))
            .catch(err => console.log(err));
    }

    render() {
        const { orders } = this.state;
        // let bookData = orders.cart.map(cartItem => cartItem.book_id.title);
        return (
            <div style={{ marginTop: '10em' }}>
                <ReactTable
                    style={{ fontSize: '30px' }}
                    data={orders}
                    SubComponent={row => {
                        return (
                            <div style={{ padding: '20px' }}>
                                {orders.map(order =>
                                    order.cart.map(cartItem => (
                                        <p>
                                            {' '}
                                            <Link
                                                to={`/book/${
                                                    cartItem.book_id.ISBN13
                                                }`}
                                            >
                                                {' '}
                                                {cartItem.book_id.title}{' '}
                                            </Link>{' '}
                                        </p>
                                    ))
                                )}
                            </div>
                        );
                    }}
                    columns={[
                        {
                            Header: 'Order Number',
                            accessor: '_id',
                            maxWidth: 500
                        },
                        {
                            Header: 'Price',
                            accessor: 'total',
                            maxWidth: 300
                        },
                        {
                            Header: 'Order Date',
                            accessor: 'createdAt',

                            maxWidth: 300
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                {/* <ButtonGroup>
                    <Button>Price</Button>
                </ButtonGroup>
                {searchResults &&
                    searchResults.length > 0 &&
                    searchResults.map(book => <p>{book.ISBN13}</p>)}
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Publish Date</th>
                            <th>Pages</th>
                            <th>Rating</th>
                            <th>Genre</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>; */}
            </div>
        );
    }
}

export default OrderPage;
