import React from 'react';
import PropTypes from 'prop-types';

const MyInfo = ({ email, name }) => (
  <p className="starwars-color sm">
    Developed By <a href={`mailto:${email}`} className="sm starwars-color md" title="you can directly give suggestions by this e-mail" >{name}</a>
  </p>
);

MyInfo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MyInfo;
