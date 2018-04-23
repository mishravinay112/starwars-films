import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./../css/components/sugessions.css'); // eslint-disable-line global-require
}

// Highlight matching words
const highlightedText = (text, highLight) => {
  const words = text.split(new RegExp(`(${highLight})`, 'gi'));
  return (
    <span>
      <For each="word" of={words}>
        <span key={index} style={word.toLowerCase() === highLight.toLowerCase() ? { backgroundColor: '#ff6' } : {}}>
          {word}
        </span>
      </For>
    </span>);
};

// this will add new film already displayed in any other character search
const addNewFilm = (alreadySuggestedFilms, newFilm) => {
  alreadySuggestedFilms.push(newFilm);
};

const Suggestions = ({ searchResults, isFetching, searchString, films, characters }) => {
  if (!searchString) {
    return null;
  }

  const alreadySuggestedFilms = [];

  return (
    <ul className="list-group text-left">
      <Choose>
        <When condition={searchString && !isFetching && !searchResults.length}>
          <li className="list-group-item">No results found :(</li>
        </When>
        <Otherwise>
          <For each="result" of={searchResults.sort()}>
            <Choose>
              <When condition={result.includes('people')}>
                <For each="film" of={characters[result].films}>
                  <If condition={!searchResults.includes(film) && !alreadySuggestedFilms.includes(film)}>
                    {addNewFilm(alreadySuggestedFilms, film)}
                    <Link
                      key={index}
                      to={film.replace('https://swapi.co/api', '')}
                      className="link"
                      title={`searched by character: ${characters[result].name}`}>

                      <li key={film} className="list-group-item">
                        <i className="fa fa-user" /> &nbsp;<i className="fa fa-arrow-right" />&nbsp;<i className="fa fa-film" />&nbsp;
                        {`${films[film] && films[film].title}, ${films[film] && new Date(films[film].release_date).getFullYear()}`}
                      </li>

                    </Link>
                  </If>
                </For>
              </When>
              <Otherwise>
                <Link key={result} to={result.replace('https://swapi.co/api', '')} className="link" title="searched by film">
                  <li className="list-group-item">
                    <i className="fa fa-film" />&nbsp;
                    {highlightedText(films[result].title, searchString)}
                    {`, ${new Date(films[result].release_date).getFullYear()}`}
                  </li>
                </Link>
              </Otherwise>
            </Choose>
          </For>
        </Otherwise>
      </Choose>
    </ul>);
};

Suggestions.propTypes = {
  isFetching: PropTypes.bool,
  searchResults: PropTypes.array,
  searchString: PropTypes.string,
  films: PropTypes.object,
  characters: PropTypes.object
};

export default Suggestions;
