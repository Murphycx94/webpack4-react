const net = require('net');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require('./webpack.dev');
const compiler = webpack(config);
const resolve = file => path.resolve(__dirname, file)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'warn'
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

const serve = (path) => express.static(resolve(path));

app.use(serve('./dist'));
app.use(serve('./public'));

function getPort() {
  return new Promise((resolve, reject) => {
    let port = process.env.PORT || 8080
    function checkPort() {
      const server = net.createServer().listen(port)
      server.on('listening', function () {
        server.close()
        resolve(port)
      })
      server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
          port += 1
          checkPort()
        } else {
          reject(err)
        }
      })
    }
    checkPort()
  })
}

getPort().then((port) => {
  app.listen(port, () => {
    setTimeout(() => {
      console.log(`

You can now view app in the browser.
      
  Local:      http://localhost:${port}/
  
Note that the development build is not optimized
To create a production build, use npm run build.

      `)
    }, 2000)
  })
})