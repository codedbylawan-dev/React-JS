Conditional Rendering

- Using an If...Else Statement
- Using Element Variables
- Using Ternary Operators
- Using Logical && Operator

Default Props

---

## 🧩 **1. Conditional Rendering**

Conditional Rendering means **displaying different UI elements based on
conditions** — like whether a user is logged in, data is loaded, or an error
occurred.

There are **4 main ways** to conditionally render elements in React:

---

### ✅ **1.1 Using `if...else` Statement**

Used when the condition is **complex** or has **multiple return cases**.

```jsx
import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {isLoggedIn: true}

  renderAuthButton = () => {
    const {isLoggedIn} = this.state
    if (isLoggedIn === true) {
      return <button>Logout</button>
    }
    return <button>Login</button>
  }

  render() {
    return <div className="container">{this.renderAuthButton()}</div>
  }
}

export default App
```

🧠 **When to use:**

- When logic is long or has **multiple `if/else if/else`** cases.
- Makes the render method cleaner.

---

### ✅ **1.2 Using Element Variables**

You store the element in a **variable**, then render it.

```jsx
import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {isLoggedIn: true}

  render() {
    const {isLoggedIn} = this.state
    let authButton

    if (isLoggedIn) {
      authButton = <button>Logout</button>
    } else {
      authButton = <button>Login</button>
    }

    return (
      <div className="container">
        <h1>React JS</h1>
        {authButton}
      </div>
    )
  }
}

export default App
```

🧠 **When to use:**

- When you want to prepare a JSX element before returning it.
- Makes the `return` block clean and readable.

---

### ✅ **1.3 Using Ternary Operator**

Most commonly used for **simple, one-line conditions**.

```jsx
import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {isLoggedIn: true}

  render() {
    const {isLoggedIn} = this.state
    return (
      <div className="container">
        {isLoggedIn ? <button>Logout</button> : <button>Login</button>}
      </div>
    )
  }
}

export default App
```

🧠 **When to use:**

- When the condition is **short and simple**.
- Great for inline rendering.

---

### ✅ **1.4 Using Logical `&&` Operator**

Used when you only need to show something **if a condition is true**.

```jsx
import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {isLoggedIn: true}

  render() {
    const {isLoggedIn} = this.state
    return (
      <div className="container">
        {isLoggedIn && <button>Logout</button>}
        {!isLoggedIn && <button>Login</button>}
      </div>
    )
  }
}

export default App
```

🧠 **When to use:**

- Best when you only need to display one element conditionally.
- Example: “Show welcome message if user is logged in”.

---

### ⚠️ **Note**

You _can_ use CSS tricks like `display: none`, but React’s conditional rendering
is **cleaner and more efficient** because the element itself doesn’t exist in
the DOM unless needed.

---

## 🎁 **2. Default Props**

Default props are used when a component **doesn’t receive a prop value** — they
help avoid `undefined` values.

**Syntax:**

```jsx
ComponentName.defaultProps = {
  propName1: 'defaultValue1',
  propName2: 'defaultValue2',
}
```

---

**Example:**

📁 **src/Welcome/index.js**

```jsx
const Welcome = props => {
  const {name, greeting} = props
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  )
}

Welcome.defaultProps = {
  name: 'Rahul',
  greeting: 'Hello',
}

export default Welcome
```

📁 **src/App.js**

```jsx
import {Component} from 'react'
import Welcome from './Welcome'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Welcome greeting="Hi" />
        <Welcome /> {/* Uses default props */}
      </div>
    )
  }
}

export default App
```

🧠 **Key Takeaway:**

- Default props prevent runtime errors.
- Useful when you want a **fallback value**.

---

### ⚡ Summary Table

| Method               | When to Use                | Example                      |
| -------------------- | -------------------------- | ---------------------------- |
| **If…Else**          | Complex conditions         | Multiple return cases        |
| **Element Variable** | Medium logic               | Store JSX in variable        |
| **Ternary Operator** | Simple condition           | Inline rendering             |
| **Logical &&**       | One condition              | Show element only when true  |
| **Default Props**    | Fallback for missing props | `ComponentName.defaultProps` |

---
