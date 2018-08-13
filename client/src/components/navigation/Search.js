import _ from 'lodash';
// import faker from 'faker';
import React, { Component } from 'react';
import { Search, Popup } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// const source = _.times(5, () => ({
//     title: faker.company.companyName(),
//     description: faker.company.catchPhrase(),
//     image: faker.internet.avatar(),
//     price: faker.finance.amount(0, 100, 2, '$')
// }));

class SearchComponent extends Component {
    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () =>
        this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        this.props.history.push(`/book/${result.ISBN13}`);
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();
            axios.get(`/api/search/${this.state.value}`).then(res =>
                this.setState({
                    results: [...res.data.books],
                    isLoading: false
                })
            );
            // const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            // const isMatch = result => re.test(result.title);

            // this.setState({
            //     isLoading: false,
            //     results: _.filter(this.state.source, isMatch)
            // });
        }, 300);
    };

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.props.history.push({
                pathname: `/search/${this.state.value}`,
                // search: `${this.state.value}`,
                state: { searchData: this.state.results }
            });
        }
    };

    render() {
        const { isLoading, value, results } = this.state;
        let titlesOnly = results.map(result => {
            return {
                title: result.title,
                // image: `http://localhost:3001${result.book_img}`,
                price: result.price,
                ISBN13: result.ISBN13
            };
        });
        return (
            // <Grid>
            //     <Grid.Column width={16}>
            <Popup
                trigger={
                    <Search
                        fluid
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(
                            this.handleSearchChange,
                            500,
                            {
                                leading: true
                            }
                        )}
                        results={titlesOnly}
                        value={value}
                        {...this.props}
                        placeholder="Search Me"
                        size="big"
                        width="100px"
                        onKeyPress={this.handleKeyPress}
                    />
                }
                horizontalOffset={10}
                position="right center"
                content="Press Enter for Advanced Search"
            />

            //     </Grid.Column>
            // </Grid>
        );
    }
}

export default withRouter(SearchComponent);
