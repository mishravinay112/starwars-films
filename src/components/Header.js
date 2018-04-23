import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoSVG from './Logo';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./../css/components/header.css'); // eslint-disable-line global-require
}

class Header extends Component {
  static propTypes = {
    logoClassName: PropTypes.string,
    showFilmInfo: PropTypes.func,
    hideFilmInfo: PropTypes.func
  }

  componentWillMount() {
    // to support all the browsers
    window.addEventListener('animationend', this.props.showFilmInfo);
    window.addEventListener('webkitAnimationEnd', this.props.showFilmInfo);
    window.addEventListener('oanimationend', this.props.showFilmInfo);
    window.addEventListener('MSAnimationEnd', this.props.showFilmInfo);
  }

  componentWillUnmount() {
    window.removeEventListener('animationend', this.props.hideFilmInfo);
    window.removeEventListener('webkitAnimationEnd', this.props.hideFilmInfo);
    window.removeEventListener('oanimationend', this.props.hideFilmInfo);
    window.removeEventListener('MSAnimationEnd', this.props.hideFilmInfo);
  }

  render() {
    const { logoClassName } = this.props;
    return (<div className="container text-center Header">
      <Choose>
        <When condition={logoClassName}>
          <section className={logoClassName}>
            <LogoSVG className={logoClassName} />
          </section>
        </When>
        <Otherwise>
          <LogoSVG />
        </Otherwise>
      </Choose>
    </div>);
  }
}

export default Header;
