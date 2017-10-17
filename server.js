const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = process.env.PORT;
const app = express();
app.set('view engine', 'html');

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: __dirname,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },

    // display no info to console (only warnings and errors)
    noInfo: false,

    quite: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    lazy: false,

    // watch options (only if lazy: false)
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist-dev/index.html')));
    res.end();
  });
} else {
  const dist = process.env.DEPLOY !== 'true' ? 'dist-prod' : 'dist-dep';
  app.use(express.static(`${__dirname}/${dist}`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `${dist}/index.html`));
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
