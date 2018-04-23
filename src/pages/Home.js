import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';

import meta from '../util/meta/home-page';
import { fetchSearchesIfNeeded } from '../actions/search';

import Header from '../components/Header';
import Searchbox from '../components/Searchbox';
import Suggestions from '../components/Suggestions';
import MyInfo from '../components/MyInfo';

export class Home extends Component {
  static propTypes = {
    searchString: PropTypes.string,
    dispatch: PropTypes.func,
    searchesByString: PropTypes.object,
    films: PropTypes.object,
    characters: PropTypes.object
  }

  static getMeta() {
    return meta;
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchString } = this.props;
    dispatch(fetchSearchesIfNeeded(searchString));
  }

  handleChange(searchString) {
    this.props.dispatch(fetchSearchesIfNeeded(searchString));
  }

  render() {
    const { searchString, searchesByString, films, characters } = this.props;
    const searchResults = (searchesByString[searchString] && searchesByString[searchString].searches) || [];
    const isFetching = searchesByString[searchString] && searchesByString[searchString].isFetching;

    const head = Home.getMeta();

    return (
      <div className="container text-center">
        <Meta title={head.title} description={head.description} link={head.link} meta={head.meta} />

        <Header />

        <MyInfo email="mishravinay112@gmail.com" name="Vinay Mishra" />

        <Searchbox isFetching={isFetching} handleChange={this.handleChange} value={searchString} />

        <Suggestions
          isFetching={isFetching}
          searchResults={searchResults}
          films={films}
          characters={characters}
          searchString={searchString}
        />

      </div>
    );
  }
}

export default connect(state => ({
  searchString: state.searchString,
  films: state.films,
  characters: state.characters,
  searchesByString: state.searchesByString
}), null)(Home);
