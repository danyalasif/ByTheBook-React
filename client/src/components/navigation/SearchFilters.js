import React from 'react';
import { Dropdown } from 'semantic-ui-react';

// import { stateOptions } from '../common';
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const SearchFilters = stateOptions => (
    <Dropdown
        placeholder="State"
        fluid
        multiple
        search
        selection
        options={stateOptions}
    />
);

export default SearchFilters;
