# Class Component and State

- Class Component
  - Syntax
- Handling Events in React
  - Syntax
- State
  - setState()

---

### 🧩 **1. Components**

React components come in two types:

#### ✅ **Functional Components**

- Simple JavaScript functions.
- Use **props** to receive data.
- Example:

  ```jsx
  const Welcome = () => <h1>Hello, User</h1>
  ```

#### ✅ **Class Components**

- ES6 classes that extend `React.Component`.
- Must have a **render()** method that returns JSX.
- Example:

  ```jsx
  import {Component} from 'react'

  class Welcome extends Component {
    render() {
      const {name} = this.props
      return <h1>Hello, {name}</h1>
    }
  }
  ```

---

### ⚡ **2. React Events**

React event handling = similar to HTML events but with small differences:

| HTML     | React (JSX) |
| -------- | ----------- |
| onclick  | onClick     |
| onchange | onChange    |
| onblur   | onBlur      |

**Example:**

```jsx
<button onClick={activateLasers}>Activate Lasers</button>
```

**Don’t call** the function in JSX like this: ❌

```jsx
onClick={this.handleClick()}
```

✅ Instead, **pass the reference**:

```jsx
onClick={this.handleClick}
```

**Tip:** To preserve `this` context, use **arrow functions**:

```jsx
handleClick = () => {
  console.log(this) // refers to the component
}
```

---

### 🔁 **3. State**

- `state` is a built-in object to store data that **changes over time**.
- When `state` updates, the UI re-renders automatically.

**Example:**

```jsx
class Counter extends Component {
  state = {count: 0}

  render() {
    const {count} = this.state
    return <p>{count}</p>
  }
}
```

---

### 🔄 **4. Updating State**

Use `this.setState()` to update.

#### Option 1: With function

(Recommended when updating based on previous state)

```jsx
this.setState(prevState => ({count: prevState.count + 1}))
```

#### Option 2: With object

```jsx
this.setState({count: 10})
```

---

### 🧠 **5. State Updates are Merged**

Updating one property doesn’t remove others:

```jsx
this.state = {key1: 'A', key2: 'B'}
this.setState({key1: 'C'})
// New state → { key1: 'C', key2: 'B' }
```

---

### ⚖️ **6. Functional vs Class Components**

| Feature         | Functional Component  | Class Component           |
| --------------- | --------------------- | ------------------------- |
| Syntax          | Function              | Class (extends Component) |
| Uses State      | ❌ (until Hooks)      | ✅ Yes                    |
| Access Props    | As function parameter | via `this.props`          |
| Easier to write | ✅                    | ❌ More verbose           |

Use **Functional Components** for simpler UIs. Use **Class Components** when you
need **state** or **lifecycle methods** (before React Hooks).

---

### 🧮 **7. Example: Counter Application**

```jsx
import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {count: 0}
  onIncrement = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  onDecrement = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }
  render() {
    const {count} = this.state
    return (
      <div className="container">
        <h1 className="count">Count {count}</h1>
        <button className="button" onClick={this.onIncrement}>
          Increase
        </button>
        <button className="button" onClick={this.onDecrement}>
          Decrease
        </button>
      </div>
    )
  }
}

export default Counter
```

---
