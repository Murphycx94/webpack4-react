const net = require('net');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const resolve = file => path.resolve(__dirname, file);
const app = express();
const config = require('./webpack.dev');
const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  logLevel: 'warn'
})
const hotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 5000
})

app.use(devMiddleware);
app.use(hotMiddleware);


app.use(express.static(resolve('../dist')));
app.use(express.static(resolve('../public')));

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
    console.log(`

You can now view app in the browser.
      
  Local:      http://localhost:${port}/
  
Note that the development build is not optimized
To create a production build, use npm run build.

      `)
  })
})