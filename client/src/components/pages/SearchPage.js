import React, { Component } from 'react';
// import axios from '../../../node_modules/axios';
// import { Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
// import FilterableTable from 'react-filterable-table';
// import { Table } from 'reactable';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Link from 'react-router-dom/Link';
// import _ from 'lodash';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
    }

    componentWillMount() {
        // axios
        //     .get(`/api/search/${this.props.match.params.searchQuery}`)
        //     .then(res => this.setState({ searchResults: res.data.books }))
        //     .catch(err => console.log(err));

        this.setState({ searchResults: this.props.location.state.searchData });
    }

    render() {
        const { searchResults } = this.state;
        return (
            <div style={{ marginTop: '8em' }}>
                <ReactTable
                    style={{ fontSize: '30px' }}
                    data={searchResults}
                    filterable
                    columns={[
                        {
                            Header: 'Title',
                            accessor: 'title',
                            maxWidth: 400,
                            filterMethod: (filter, row) =>
                                row[filter.id]
                                    .toLowerCase()
                                    .includes(filter.value)
                        },
                        {
                            Header: 'Price',
                            accessor: 'price',
                            maxWidth: 200,
                            filterMethod: (filter, row) => {
                                if (filter.value.substring(0, 1) === '>') {
                                    return (
                                        row[filter.id] >
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                } else if (
                                    filter.value.substring(0, 1) === '<'
                                ) {
                                    return (
                                        row[filter.id] <
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                } else if (
                                    filter.value.substring(0, 1) === '='
                                ) {
                                    return (
                                        row[filter.id] ===
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                }
                            }
                        },
                        {
                            Header: 'Pages',
                            accessor: 'pages',
                            maxWidth: 200,
                            filterMethod: (filter, row) => {
                                if (filter.value.substring(0, 1) === '>') {
                                    return (
                                        row[filter.id] >
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                } else if (
                                    filter.value.substring(0, 1) === '<'
                                ) {
                                    return (
                                        row[filter.id] <
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                } else if (
                                    filter.value.substring(0, 1) === '='
                                ) {
                                    return (
                                        row[filter.id] ===
                                        parseInt(filter.value.substring(1), 10)
                                    );
                                }
                            }
                        },
                        {
                            Header: 'Author',
                            accessor: 'author.name',
                            maxWidth: 400,
                            filterMethod: (filter, row) =>
                                row[filter.id]
                                    .toLowerCase()
                                    .includes(filter.value)
                        },
                        {
                            Header: 'Link',
                            accessor: 'ISBN13',
                            Cell: row => (
                                <Link to={`/book/${row.value}`}> Link </Link>
                            ),
                            maxWidth: 200
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

export default SearchPage;
