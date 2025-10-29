# On Demand Session

- Third-party packages
  - uuid
- Adding New Item to the List in State
- Updating an Item of the List in State

---

## 🧠 Concepts in Focus

### 1. Third-Party Packages

- **UUID (Universally Unique Identifier)** generates unique IDs for every new
  contact.
- **Install:**

  ```bash
  npm install uuid
  ```

- **Import:**

  ```js
  import {v4 as uuidv4} from 'uuid'
  ```

- **Usage:**

  ```js
  id: uuidv4()
  ```

  Every call creates a new, globally unique ID — ideal for keys or database
  records.

---

### 2. Best Practice — Immutable State

React’s state should **never be changed directly**. Instead of:

```js
this.state.contactsList.push(newContact) ❌
```

Use:

```js
this.setState(prevState => ({
  contactsList: [...prevState.contactsList, newContact], ✅
}))
```

The **spread operator** creates a new array, preserving immutability — which
keeps React’s re-rendering efficient and predictable.

---

### 3. Updating a Property of an Item inside a List

When toggling or modifying a property (like `isFavorite`), **create a new
object** — don’t mutate the existing one.

**Example:**

```js
this.setState(prevState => ({
  contactsList: prevState.contactsList.map(eachContact => {
    if (id === eachContact.id) {
      return {...eachContact, isFavorite: !eachContact.isFavorite} // ✅
    }
    return eachContact
  }),
}))
```

---

## 📱 Contacts App Final Code Summary

### 🧩 App.js — Parent Component

**Responsibilities**

- Holds the contact list state.
- Adds new contacts.
- Toggles favorite contacts.

**Key Functions**

| Function                            | Purpose                                      |
| ----------------------------------- | -------------------------------------------- |
| `toggleIsFavorite(id)`              | Flips the `isFavorite` boolean of a contact. |
| `onAddContact(event)`               | Adds a new contact with a unique UUID.       |
| `onChangeName` / `onChangeMobileNo` | Controlled input handlers.                   |

**Controlled Form:** Inputs use `value` + `onChange` to stay in sync with React
state.

---

### 🧱 ContactItem.js — Child Component

**Responsibilities**

- Displays name and number.
- Shows favorite icon (filled ⭐ or outline ☆).
- Calls `toggleIsFavorite` (passed via props) on click.

```jsx
const starImgUrl = isFavorite
  ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
  : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'
```

**Event Handling**

```jsx
<button onClick={() => toggleIsFavorite(id)}>
  <img src={starImgUrl} alt="star" />
</button>
```

---

## 🔑 Core Concepts Demonstrated

| Concept                           | Explanation                                      |
| --------------------------------- | ------------------------------------------------ |
| **UUID**                          | Generates unique IDs for reliable keys           |
| **Immutability**                  | Prevents direct state mutation                   |
| **Array map()**                   | Safely updates items inside arrays               |
| **Controlled Inputs**             | Input fields reflect state values                |
| **Child to Parent Communication** | Functions passed via props trigger state updates |

---

## 🚀 Real-World Use Case

This app mimics a **simple contacts manager**:

- Add, display, and favorite/unfavorite contacts.
- Learn clean React data flow (`state → props → UI → events → state`).

---
