import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCharacterIfNeeded } from '../actions/characters';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('../css/components/details.css'); // eslint-disable-line global-require
}

const episodeIds = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

class FilmDetails extends Component {
  static propTypes = {
    film: PropTypes.object,
    characters: PropTypes.object,
    dispatch: PropTypes.func
  };

  async componentWillMount() {
    const { film, dispatch } = this.props;
    await film.characters.map(character => dispatch(fetchCharacterIfNeeded(character)));
  }

  render() {
    const { film, characters } = this.props;
    return (
      <section className="information text-center">
        <div className="text-center">
          <h1>
            <p>Episode {episodeIds[film.episode_id] ? episodeIds[film.episode_id] : film.episode_id}</p>
          </h1>
          <p className="film-name">{film.title}</p>
          <h1><p>Director:<br />{film.director}</p></h1>
          <h1><p>Producer(s):<br />{film.producer}</p></h1>
          <h1><p>Release Date:<br />{film.release_date}</p></h1>
          <h1><p>Character(s):<br /></p></h1>
          <For each="character" of={film.characters}>
            <h1 key={character}>
              <p>{characters[character] && characters[character].name}<br /></p>
            </h1>
          </For>
        </div>
      </section>
    );
  }
}

export default FilmDetails;
