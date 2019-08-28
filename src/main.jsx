import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.less'

ReactDOM.render(<App />, document.getElementById('root'))

// 热更新支持，不要删除
if (module.hot) {
  module.hot.accept()
}
