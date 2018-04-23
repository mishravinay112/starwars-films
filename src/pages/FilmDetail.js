import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';
import meta from '../util/meta/film-detail-page';
import Header from '../components/Header';
import Details from '../components/Details';
import { fetchFilmIfNeeded } from '../actions/films';
import { fetchCharacterIfNeeded } from '../actions/characters';
import { showDetail, hideDetail } from '../actions/display-film-detail';
import { FILMS_ENDPOINT } from '../util/api-endpoints';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('../css/pages/film-detail.css'); // eslint-disable-line global-require
}

class FilmDetail extends Component {
  static propTypes = {
    films: PropTypes.object,
    characters: PropTypes.object,
    displayDetail: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.showFilmInfo = this.showFilmInfo.bind(this);
    this.hideFilmInfo = this.hideFilmInfo.bind(this);
  }

  static getMeta() {
    return meta;
  }

  async componentWillMount() {
    const { films, params, dispatch } = this.props;
    const film = `${FILMS_ENDPOINT}/${params.filmId}/`;

    if (!films[film]) {
      await dispatch(fetchFilmIfNeeded(film));
    }
  }

  async componentDidUpdate() {
    const { films, params, dispatch } = this.props;
    const film = `${FILMS_ENDPOINT}/${params.filmId}/`;

     // if we found the film get all characters
    if (films[film] && !films[film].detail && !films[film].isFetching) {
      await films[film].characters.map(character => dispatch(fetchCharacterIfNeeded(character)));
    }
  }

  showFilmInfo() {
    this.props.dispatch(showDetail(this.props.displayDetail.show));
  }

  hideFilmInfo() {
    this.props.dispatch(hideDetail());
  }

  componentWillUnmount() {
    this.props.dispatch(hideDetail());
  }

  render() {
    const { films, params, characters, dispatch } = this.props;
    const film = `${FILMS_ENDPOINT}/${params.filmId}/`;

    const head = FilmDetail.getMeta();

    return (<div className="container film-detail">
      <Meta title={head.title} description={head.description} link={head.link} meta={head.meta} />

      <Link to="/" className="home-menu" title="Go to Home Page">
        <i className="fa fa-home" aria-hidden="true" />
      </Link>

      <Header
        logoClassName="animation-logo"
        showFilmInfo={this.showFilmInfo}
        hideFilmInfo={this.hideFilmInfo}
      />

      <Choose>
        <When condition={this.props.displayDetail.show}>
          <Choose>
            <When condition={films[film] && films[film].detail && !films[film].isFetching}>
              <h1 className="text-center lg">404</h1><br />
              <h2 className="text-center md">Page Not Found</h2>
            </When>
            <When condition={films[film] && films[film].isFetching}>
              <div className="text-center">
                <span className="fa fa-circle-o-notch fa-spin lg" />
                <span className="md">Loading</span>
              </div>
            </When>
            <Otherwise>
              <Details film={films[film]} characters={characters} dispatch={dispatch} />
            </Otherwise>
          </Choose>
        </When>
      </Choose>

    </div>);
  }
}

export default connect(state => ({
  displayDetail: state.displayDetail,
  films: state.films,
  characters: state.characters
}))(FilmDetail);
