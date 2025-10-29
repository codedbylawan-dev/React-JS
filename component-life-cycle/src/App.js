import {Component} from 'react'
import Clock from './components/Clock'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <button type="button" className="toggle-button">
          Hide Clock
        </button>
        <Clock />
      </div>
    )
  }
}

export default App
