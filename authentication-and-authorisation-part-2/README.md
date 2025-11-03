# Authentication & Authorization | Part 2

- Authentication Flow in React
  - Storing JWT Token
  - Handling Login Failure
- Cookies
  - Cookies.set()
  - Cookies.get()
  - Cookies.remove()
- Handling Route Redirections
  - Unauthenticated Scenario
  - Authenticated Scenario
- React Router
  - withRouter

---

### 🔐 1. JWT Token (JSON Web Token)

- Used for authentication — server gives a **token** after login, client sends
  it in all future requests (`Authorization: Bearer <jwt_token>`).
- It’s stored on the **client** side, not the server.
- If you store JWT only in React **state**, it disappears on page refresh.

---

### 💾 2. Storage Mechanisms

| Storage Type        | Description                                  |
| ------------------- | -------------------------------------------- |
| **Local Storage**   | Data never expires unless removed manually   |
| **Cookies**         | Can have expiration, sent with HTTP requests |
| **Session Storage** | Cleared when tab closes                      |
| **IndexedDB**       | Large structured data storage                |

---

### 🍪 3. Cookies

- Stored by browser; contain `name=value`, `expires`, `domain`, `path`, and
  optionally `secure`.
- Useful for JWT because of **auto-expiration**.

#### Why Cookies?

- Banking → short expiry
- Social Media → long expiry

#### Cookies vs Local Storage

| Cookies                          | Local Storage          |
| -------------------------------- | ---------------------- |
| Expiry possible                  | No expiry              |
| ~4 KB limit                      | 5–10 MB limit          |
| Sent automatically with requests | Must be manually added |

---

### ⚙️ 3.3 js-cookie package

Simplifies cookie handling.

```bash
npm install js-cookie --save
```

| Method                                          | Use           |
| ----------------------------------------------- | ------------- |
| `Cookies.set('name', 'value', {expires: days})` | create/update |
| `Cookies.get('name')`                           | read          |
| `Cookies.remove('name')`                        | delete        |

✅ Example:

```js
Cookies.set('jwt_token', token, {expires: 30})
const token = Cookies.get('jwt_token')
Cookies.remove('jwt_token')
```

---

### 🔄 4. Redirect Component

Used to **navigate programmatically** in React Router.

```jsx
<Redirect to="/login" />
```

| Use Case                                           | Method                         |
| -------------------------------------------------- | ------------------------------ |
| Stop rendering UI (e.g. unauthenticated users)     | `<Redirect />`                 |
| Trigger navigation after event (e.g. button click) | `history.push()` / `replace()` |

---

### 🚗 5. withRouter

- Used when a component **is not directly inside a `<Route>`** but needs access
  to `history`, `match`, `location`.
- Example:

```js
import {withRouter} from 'react-router-dom'
export default withRouter(Header)
```

---

### 🛍️ 6. E-Commerce Example (Flow)

1. **LoginForm** → sends POST to API

   - On success → store JWT in cookie (`Cookies.set`) → `history.replace('/')`
   - On failure → show error message

2. **Protected Components** (Home, Products, Cart)

   - Read JWT with `Cookies.get('jwt_token')`
   - If not found → `<Redirect to="/login" />`

3. **Logout (Header)**

   - Remove token → redirect to login

---

### 🧠 Study Tips

✅ **Memorize the flow:**

> Login → Store JWT → Access Protected Routes → Logout → Redirect

✅ **Understand difference:**

- `Redirect` = for rendering logic
- `history.push()` = for event logic
- `withRouter()` = to access history in non-route components
- `Cookies` = for persistent authentication

---
