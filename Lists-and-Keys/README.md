# Lists and Keys

- Lists
  - Preparing Data
  - Rendering lists
- Keys
  - Adding Unique Key
  - Key Attribute

---

### 📅 **Date:** 27 October 2025

### 🎯 **Focus:** Lists & Keys in React JS

### 🧠 **Goal:**

To understand how to efficiently render lists in React using the `map()`
function, the importance of `keys`, and how to use keys properly while creating
reusable list-based components.

---

### 📘 **Concepts Learned**

#### **1. Keys**

- **Definition:** Keys help React **identify which items have changed, been
  added, or removed** during re-rendering. They provide each list item with a
  **stable identity**.

- **Rule:** Use a **unique string** (often an `id` or `uniqueNo`) as the key.

**Example:**

```javascript
const userDetails = [
  {
    uniqueNo: 1,
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/esther-howard-img.png',
    name: 'Esther Howard',
    role: 'Software Developer',
  },
]
```

**File:** `src/App.js`

```jsx
import UserProfile from './components/UserProfile/index'

const userDetailsList = [
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
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/esther-devon-lane.png',
    name: 'Devon Lane',
    role: 'Software Developer',
  },
]

const App = () => (
  <div className="list-container">
    <h1 className="title">Users List</h1>
    <ul>
      {userDetailsList.map(eachItem => (
        <UserProfile key={eachItem.uniqueNo} userDetails={eachItem} />
      ))}
    </ul>
  </div>
)

export default App
```

> 📝 **Note:**
>
> - The `index.js` file in a folder is treated as the main file.
> - You can import using `./components/UserProfile` instead of the full path
>   `./components/UserProfile/index`.
> - Keys must be **unique among siblings**, but not necessarily in the entire
>   app.

---

#### **1.1 Keys as Props**

- Keys **do not get passed** to child components automatically as props.
- If you need the same key value in the component, you must **pass it
  explicitly** with a different name.

**Example:**

```jsx
const UserProfile = props => {
  const {userDetails} = props
  const {imageUrl, name, role, key} = userDetails
  console.log(key) // undefined

  return (
    <li className="user-card-container">
      <img src={imageUrl} className="avatar" alt="avatar" />
      <div className="user-details-container">
        <h1 className="user-name">{name}</h1>
        <p className="user-designation">{role}</p>
      </div>
    </li>
  )
}

export default UserProfile
```

✅ **Correct way to pass the same value explicitly:**

```jsx
const UsersList = userDetailsList.map(userDetails => (
  <UserProfile
    key={userDetails.uniqueNo}
    uniqueNo={userDetails.uniqueNo}
    name={userDetails.name}
  />
))
```

---

#### **2. Users List Application**

**File:** `src/App.js`

```jsx
import UserProfile from './components/UserProfile/index'

const userDetailsList = [
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
    imageUrl: 'https://assets.ccbp.in/frontend/react-js/esther-devon-lane.png',
    name: 'Devon Lane',
    role: 'Software Developer',
  },
]

const App = () => (
  <div className="list-container">
    <h1 className="title">Users List</h1>
    <ul>
      {userDetailsList.map(eachItem => (
        <UserProfile key={eachItem.uniqueNo} userDetails={eachItem} />
      ))}
    </ul>
  </div>
)

export default App
```

---

**File:** `src/components/UserProfile/index.js`

```jsx
import './index.css'

const UserProfile = props => {
  const {userDetails} = props
  const {imageUrl, name, role} = userDetails

  return (
    <li className="user-card-container">
      <img src={imageUrl} className="avatar" alt="avatar" />
      <div className="user-details-container">
        <h1 className="user-name">{name}</h1>
        <p className="user-designation">{role}</p>
      </div>
    </li>
  )
}

export default UserProfile
```

---

#### ⚠️ **Common Error**

If you see:

```
ENOSPC: System limit for the number of file watchers reached
```

**Reason:** `create-react-app` live-reloads and watches all project files, and
your system’s file watcher limit was reached.

**Fix (Linux/Mac):**

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

**Check applied value:**

```bash
cat /proc/sys/fs/inotify/max_user_watches
```

---
