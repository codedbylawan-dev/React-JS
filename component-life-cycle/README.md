# Component Life Cycle

- Mounting Phase
  - constructor()
  - render()
  - componentDidMount()
- Updating Phase
  - render()
- Unmounting phase
  - componentWillUnmount()
- Behind the scenes
  - Virtual DOM

---

### 🧭 **React Component Life Cycle – Overview**

A **React class component** goes through **three main phases** in its lifetime:

1. **Mounting** → Component is created and inserted into the DOM.
2. **Updating** → Component is re-rendered when state or props change.
3. **Unmounting** → Component is removed from the DOM.

---

### ⚡ **1. Mounting Phase**

This phase happens when the component appears on the screen for the first time.

🧩 **Main Methods (in order):**

1. `constructor()` – Set up initial state or variables.

   ```jsx
   constructor(props) {
     super(props);
     this.state = { date: new Date() };
   }
   ```

2. `render()` – Returns the JSX (UI part) to display.
3. `componentDidMount()` – Runs once after the component is inserted into the
   DOM. → Used for:

   - Starting timers
   - Fetching data from APIs
   - Setting up subscriptions

---

### 🔁 **2. Updating Phase**

Occurs when there is a change in state or props. Every update triggers the
**`render()`** method again.

🧩 **Common Use Case:** When `setState()` is called → React re-renders the
component with updated data.

---

### 🧹 **3. Unmounting Phase**

Happens when the component is removed from the DOM (for example, when navigating
away or hiding it).

🧩 **Method:**

- `componentWillUnmount()` – Cleans up before component is destroyed. → Used for
  clearing timers or cancelling API calls.

---

### ⏰ **Example: Clock Component**

This example shows all 3 phases in action 👇

#### 🗂 File: `src/components/Clock/index.js`

```jsx
import {Component} from 'react'
import './index.css'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {date: new Date()}
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick = () => {
    this.setState({date: new Date()})
  }

  render() {
    const {date} = this.state
    return (
      <div className="clock-container">
        <h1 className="heading">Clock</h1>
        <p className="time">{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default Clock
```

#### 🗂 File: `src/App.js`

```jsx
import {Component} from 'react'
import Clock from './components/Clock'
import './App.css'

class App extends Component {
  state = {showClock: false}

  onToggleClock = () => {
    this.setState(prevState => ({showClock: !prevState.showClock}))
  }

  render() {
    const {showClock} = this.state
    return (
      <div className="app-container">
        <button
          onClick={this.onToggleClock}
          type="button"
          className="toggle-button"
        >
          {showClock ? 'Hide Clock' : 'Show Clock'}
        </button>
        {showClock && <Clock />}
      </div>
    )
  }
}

export default App
```

✅ When you click the button:

- `Clock` component **mounts** (shows time) → Timer starts.
- When hidden → Component **unmounts** → Timer stops.

---
