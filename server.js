import path from 'path';
import express from 'express';
import webpack from 'webpack';
import middleware from './src/middleware';
import config from './webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname, 'src')));

app.get('*', middleware);

app.listen(3000, '0.0.0.0', (err) => {
  if(err) {
    console.error(err);
  } else {
    console.info('Listening at http://localhost:3000');
  }
});
