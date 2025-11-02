# Authentication & Authorization

- Client Server Communication
  - Authentication & Authorization
- E-Commerce Application
  - Authentication Flow
- Route Parameters
  - history

---

# 🧠 Authentication & Authorization | React Router Cheat Sheet

---

## 🔗 1. Client–Server Communication

### **1.1 Authentication**

➡️ The process of **verifying user identity** (checking _who_ the user is). ✅
Example: Login with username & password.

```js
const url = 'https://apis.ccbp.in/login'
```

---

### **1.2 Authorization**

➡️ The process of **verifying user permissions** (checking _what_ user can do).
✅ Example:

- Admin → can **Read, Create, Update, Delete**
- User → can **Read & Create** only

---

## 🔐 2. Authentication Flow (Simplified)

| Step | Description                                                |
| ---- | ---------------------------------------------------------- |
| 1️⃣   | User enters credentials in Login form                      |
| 2️⃣   | Send credentials via `fetch()` to Login API                |
| 3️⃣   | If response is success (status 2xx), user is authenticated |
| 4️⃣   | Navigate to protected route using `history.replace()`      |
| 5️⃣   | Store JWT token (optional for next lessons)                |
| 6️⃣   | Display protected pages like Home, Products, or Cart       |

---

## 🌍 3. Route Props

When a component is rendered using `Route`, React Router passes **three props**:

| Prop       | Description                                           |
| ---------- | ----------------------------------------------------- |
| `match`    | Info about the URL and path parameters                |
| `history`  | Methods to control navigation programmatically        |
| `location` | Info about current URL (pathname, search, hash, etc.) |

---

### 🔁 3.1 History Object Methods

#### **3.1.1 `history.push("PATH")`**

✅ Navigates to another route. Allows **backward and forward** navigation.

```js
history.push('/products')
```

#### **3.1.2 `history.replace("PATH")`**

✅ Replaces the current URL with a new one. Prevents going back to previous
route (e.g., after login).

```js
history.replace('/')
```

🧠 _Example:_ In `LoginForm` after successful login:

```js
onSubmitSuccess = () => {
  const {history} = this.props
  history.replace('/')
}
```

---

## 🛒 4. E-Commerce App Flow

### Files Overview

#### **App.js**

Handles **routing** between components.

```jsx
<BrowserRouter>
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/cart" component={Cart} />
    <Route component={NotFound} />
  </Switch>
</BrowserRouter>
```

---

### ✅ Login Flow

**LoginForm component**

- Captures username & password.
- Sends POST request using `fetch`.
- On success → redirects using `history.replace("/")`.

```jsx
const url = 'https://apis.ccbp.in/login'
const options = {
  method: 'POST',
  body: JSON.stringify(userDetails),
}
const response = await fetch(url, options)
if (response.ok === true) {
  this.onSubmitSuccess()
}
```

---

## 💡 Authenticated Credentials (for Testing)

| Username  | Password            |
| --------- | ------------------- |
| henry     | henry_the_developer |
| david     | the_miller@23       |
| robert    | WilsonRobert45      |
| mosh      | DevMosh22           |
| rahul     | rahul@2021          |
| praneetha | praneetha@2021      |

---

## 🧩 5. Important Concepts Summary

| Concept                 | Description                      | Example               |
| ----------------------- | -------------------------------- | --------------------- |
| **Authentication**      | Verifies user identity           | Login API             |
| **Authorization**       | Grants permissions               | Admin vs User         |
| **`history.push()`**    | Navigate & keep history          | Move to Products page |
| **`history.replace()`** | Navigate & remove history        | Login redirect        |
| **`match.params`**      | Extract dynamic route parameters | `/products/:id`       |
| **`location.pathname`** | Current URL                      | `/cart`               |
| **`response.ok`**       | Checks success (2xx)             | `if(response.ok)`     |

---

## ⚙️ 6. Key Notes

- If `response.ok` is `true` → status is 2xx (Success).
- Every time the **route changes**, the `<Switch>` in `App.js` re-renders the
  corresponding component.
- Components like **Header** can be placed outside `Switch` if you want them
  visible on all pages.
- Use `history.replace()` after login to avoid returning to the login page on
  back click.

---
