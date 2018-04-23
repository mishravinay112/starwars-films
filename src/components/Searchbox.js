import React from 'react';
import PropTypes from 'prop-types';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./../css/components/searchbox.css'); // eslint-disable-line global-require
}

const SearchBox = ({ handleChange, value, isFetching }) => (
  <div className="form-group">
    <div className="form-group has-feedback autocomplete">
      <input
        type="text"
        className="form-control input-lg"
        value={value || ''}
        list="suggestions"
        onChange={e => handleChange(e.target.value)}
        placeholder="Type in for movie suggestions..."
      />
      <If condition={isFetching}>
        <span className="fa fa-circle-o-notch fa-spin form-control-feedback" />
      </If>
    </div>
  </div>
);

SearchBox.propTypes = {
  value: PropTypes.string,
  isFetching: PropTypes.bool,
  handleChange: PropTypes.func.isRequired
};

export default SearchBox;
