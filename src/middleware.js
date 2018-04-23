import { match } from 'react-router';
import Meta from 'react-helmet';
import routes from './routes';
import developmentHtmlPage from './util/static-pages/development';

const head = Meta.rewind();

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      if (process.env.NODE_ENV === 'development') {
        res.status(200).send(developmentHtmlPage(head));
      }
    } else {
      res.status(404).send('Not found');
    }
  });
};
