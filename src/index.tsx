import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import settings from 'utils/settings'

const root = document.getElementById('root')
settings.setAppElement(root)
settings.configureToast()

ReactDOM.render(<App />, root)
