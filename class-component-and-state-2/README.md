# Class Component and State Part 2

- Searchable Users List
  - Searching User
  - Deleting User
- setState()
  - Object Syntax
- Components
  - Passing Callbacks

---

## 🧠 **1. `setState()` Object Syntax**

There are **two ways** to update state in a class component:

### ✅ **A. Object Syntax**

Used when the new state **doesn’t depend** on the previous state.

```js
this.setState({quantity: 2})
```

📌 **Use when:** You just want to replace a value with a fixed one.

---

### ✅ **B. Callback Syntax**

Used when the new state **depends on the previous state**.

```js
this.setState(prevState => {
  return {count: prevState.count + 1}
})
```

📌 **Use when:** You want to increment, toggle, or compute based on old state.

---

### ⚖️ **Comparison Table**

| Syntax   | Use When               | Example                                              |
| -------- | ---------------------- | ---------------------------------------------------- |
| Object   | Static or direct value | `this.setState({ theme: 'dark' })`                   |
| Callback | Depends on old state   | `this.setState(prev => ({ count: prev.count + 1 }))` |

---

## 📨 **2. Sending Function as Callback (Passing Functions as Props)**

You can **send a function** from a parent component to a child, so the child can
**communicate back**.

### ✅ **Syntax:**

```jsx
<ComponentName functionName={this.functionName} />
```

Then inside the child component, you can call it via `props`.

### 💡 Example:

```jsx
// Parent Component
deleteUser = id => {
  console.log('Deleted user with id:', id)
}
;<UserProfile deleteUser={this.deleteUser} />
```

```jsx
// Child Component
const UserProfile = props => {
  const {deleteUser} = props
  return <button onClick={() => deleteUser(1)}>Delete</button>
}
```

📌 **Use when:** A child component needs to perform an action that affects
parent state (e.g., deleting or updating an item).

---

## 🎛️ **3. Input Element in React**

Inputs can be **controlled** or **uncontrolled** — this is super important to
understand.

---

### ✅ **3.1 Controlled Input**

- The input value is **controlled by React State**.
- React updates it programmatically.

```jsx
import {Component} from 'react'

class App extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state
    return (
      <input
        type="text"
        onChange={this.onChangeSearchInput}
        value={searchInput}
      />
    )
  }
}

export default App
```

📌 **Use when:** You want React to manage the form data (recommended way).

---

### ✅ **3.2 Uncontrolled Input**

- The input value is **handled by the browser**, not React.
- React doesn’t track changes.

```jsx
<input type="text" />
```

📌 **Use when:** You don’t need to manage the value (rarely used in React apps).

---

## 👥 **4. Searchable Users List Application**

Here’s the complete workflow combining **state, props, functions, filtering, and
input control**.

---

### 📁 `src/App.js`

```jsx
import {Component} from 'react'
import UserProfile from './components/UserProfile'
import './App.css'

const initialUserDetailsList = [
  {
    uniqueNo: 1,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/esther-howard-img.png',
    name: 'Esther Howard',
    role: 'Software Developer',
  },
  {
    uniqueNo: 2,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/floyd-miles-img.png',
    name: 'Floyd Miles',
    role: 'Software Developer',
  },
  {
    uniqueNo: 3,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/jacob-jones-img.png',
    name: 'Jacob Jones',
    role: 'Software Developer',
  },
  {
    uniqueNo: 4,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/devon-lane-img.png',
    name: 'Devon Lane',
    role: 'Software Developer',
  },
]

class App extends Component {
  state = {
    searchInput: '',
    usersDetailsList: initialUserDetailsList,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteUser = uniqueNo => {
    const {usersDetailsList} = this.state
    const filteredUsersData = usersDetailsList.filter(
      each => each.uniqueNo !== uniqueNo,
    )
    this.setState({usersDetailsList: filteredUsersData})
  }

  render() {
    const {searchInput, usersDetailsList} = this.state
    const searchResults = usersDetailsList.filter(eachUser =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <h1 className="title">Users List</h1>
        <input
          type="search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
          placeholder="Search by name..."
        />
        <ul className="list-container">
          {searchResults.map(eachUser => (
            <UserProfile
              userDetails={eachUser}
              key={eachUser.uniqueNo}
              deleteUser={this.deleteUser}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
```

---

### 📁 `src/components/UserProfile/index.js`

```jsx
import './index.css'

const UserProfile = props => {
  const {userDetails, deleteUser} = props
  const {imageUrl, name, role, uniqueNo} = userDetails

  const onDelete = () => {
    deleteUser(uniqueNo)
  }

  return (
    <li className="user-card-container">
      <img src={imageUrl} className="profile-pic" alt="profile-pic" />
      <div className="user-details-container">
        <h1 className="user-name">{name}</h1>
        <p className="user-designation">{role}</p>
      </div>
      <button className="delete-button" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cross-img.png"
          alt="cross"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default UserProfile
```

---

### ⚙️ **How It Works**

1. `App` manages **state** (users + search input).
2. User types in the input → `onChangeSearchInput()` updates state.
3. Filtered list is shown dynamically based on `searchInput`.
4. Clicking the ❌ button calls `deleteUser(uniqueNo)` from the parent to remove
   that user.

---

### 🧭 **Key Takeaways**

| Concept               | Description                                   |
| --------------------- | --------------------------------------------- |
| `setState()` Object   | Used for static updates                       |
| `setState()` Callback | Used for dynamic/previous value-based updates |
| Function as Prop      | Allows parent-child communication             |
| Controlled Input      | Input value managed via React state           |
| Uncontrolled Input    | Input managed by browser                      |
| Real App Example      | Searchable + Deletable user list              |

---
