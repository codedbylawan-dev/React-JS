# Authentication & Authorization | Part 4

- Integrating APIs
  - Get Exclusive Prime Deals
- API Call Possible Views
  - Handle Success View
  - Handle Failure View
  - Handle Loading View

---

## 🧠 **Common Mistakes — React Router & Auth (Part 3 Cheat Sheet)**

---

### 🧩 1. User-Defined Functions in Class Components

**❌ Mistake**

```js
onChangeUsername(event) {
  this.setState({ username: event.target.value })
}
```

🔍 _`this` becomes undefined because normal functions run in browser context._

**✅ Fix**

```js
onChangeUsername = event => {
  this.setState({username: event.target.value})
}
```

> Use **arrow functions** for all event handlers inside class components.
> Lifecycle methods (`render`, `componentDidMount`, etc.) don’t need arrow
> syntax.

---

### 🚫 2. Using `<Redirect>` in Callbacks

**❌ Mistake**

```js
const onClickLogout = () => {
  Cookies.remove('jwt_token')
  return <Redirect to="/login" />
}
```

🔍 `Redirect` returns JSX—it only works inside `render()` or return statements.

**✅ Fix**

```js
const onClickLogout = () => {
  const {history} = props
  Cookies.remove('jwt_token')
  history.replace('/login')
}
```

> In **event handlers**, use the `history` object for navigation.

---

### 🧭 3. Using `history.replace()` in `render()`

**❌ Mistake**

```js
render() {
  const { history } = this.props
  if (Cookies.get('jwt_token')) {
    history.replace('/')
  }
}
```

🔍 Manipulating history inside `render()` causes unnecessary re-renders.

**✅ Fix**

```js
if (Cookies.get('jwt_token')) {
  return <Redirect to="/" />
}
```

> In **render methods**, always use `<Redirect>` for navigation.

---

### 🔗 4. Missing `withRouter()`

**❌ Mistake**

```js
const Header = props => {
  const {history} = props
  // history will be undefined
}
export default Header
```

**✅ Fix**

```js
import {withRouter} from 'react-router-dom'
export default withRouter(Header)
```

> `withRouter()` injects `history`, `location`, and `match` props into non-route
> components.

---

### 📦 5. Incorrect Request Object Keys

**❌ Mistake**

```js
const userDetails = {userName: username, password}
```

🔍 Backend expects `username`, not `userName`.

**✅ Fix**

```js
const userDetails = {username, password}
```

> Always verify **API field names** match your backend’s expectation.

---

### 🔁 6. Not Updating State on Login Failure

**❌ Mistake**

```js
this.setState({errorMsg: error})
```

…but you forget `showSubmitError: true`.

**✅ Fix**

```js
this.setState({showSubmitError: true, errorMsg: error})
```

> Without state update, the UI never re-renders to display the error message.

---

### ⚡ Quick Reference Table

| #   | Problem                       | Use Instead              |
| --- | ----------------------------- | ------------------------ |
| 1   | Regular functions in class    | Arrow functions          |
| 2   | `<Redirect>` in event         | `history.replace()`      |
| 3   | `history.replace()` in render | `<Redirect>`             |
| 4   | Missing `withRouter()`        | Wrap component           |
| 5   | Wrong API keys                | Match backend            |
| 6   | No state update on error      | Update `showSubmitError` |

---

## 🔐 Authentication & Authorization — Part 4 Cheat Sheet

---

### 🌍 **1. Integrating APIs**

**Goal:** Show different views based on user authentication & authorization
(Prime vs Non-Prime).

- **Prime users** → Access to _Exclusive Prime Deals_
- **Non-Prime users** → See _Get Exclusive Deals_ section

---

### ⚙️ **2. API Call Views**

| View            | Description                | When It Appears                     |
| --------------- | -------------------------- | ----------------------------------- |
| ✅ Success View | Show Prime Deals           | API success (Authorized Prime user) |
| ❌ Failure View | Show _Get Exclusive Deals_ | Unauthorized user (401 error)       |
| ⏳ Loading View | Show Loader                | API fetch in progress               |

**Common API Failure Reasons**

- Missing or invalid JWT Token
- Wrong `Authorization` header
- Incorrect HTTP method

---

### 🧩 **3. E-Commerce App Structure**

#### ✅ App.js

Main routes setup with protected and unprotected paths.

```jsx
<BrowserRouter>
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/products" component={Products} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
</BrowserRouter>
```

---

### 🧱 **ProtectedRoute Component**

Used to restrict access based on authentication (JWT token).

```jsx
import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
```

> ✅ Checks JWT token before rendering component.

---

### 🧍‍♂️ **LoginForm Component (Authentication)**

Handles:

- Username & password input
- Form submission
- Token storage using `js-cookie`
- Redirection after successful login

Key methods:

```js
onSubmitSuccess = jwtToken => {
  const {history} = this.props
  Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
  history.replace('/')
}

onSubmitFailure = errorMsg => {
  this.setState({showSubmitError: true, errorMsg})
}
```

---

### 💫 **PrimeDealsSection Component (Authorization)**

Handles:

- API call with JWT token
- Renders Success, Failure, and Loading views

#### Constants for API states:

```js
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
```

#### State:

```js
state = {
  primeDeals: [],
  apiStatus: apiStatusConstants.initial,
}
```

#### Fetch & View Rendering:

```js
getPrimeDeals = async () => {
  this.setState({apiStatus: apiStatusConstants.inProgress})
  const jwtToken = Cookies.get('jwt_token')
  const apiUrl = 'https://apis.ccbp.in/prime-deals'
  const options = {
    headers: {Authorization: `Bearer ${jwtToken}`},
    method: 'GET',
  }
  const response = await fetch(apiUrl, options)

  if (response.ok) {
    const data = await response.json()
    const updatedData = data.prime_deals.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      brand: item.brand,
      rating: item.rating,
      imageUrl: item.image_url,
    }))
    this.setState({
      primeDeals: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  } else if (response.status === 401) {
    this.setState({apiStatus: apiStatusConstants.failure})
  }
}
```

#### Render Logic:

```js
switch (apiStatus) {
  case apiStatusConstants.success:
    return this.renderPrimeDealsList()
  case apiStatusConstants.failure:
    return this.renderPrimeDealsFailureView()
  case apiStatusConstants.inProgress:
    return this.renderLoadingView()
  default:
    return null
}
```

---

### ⚡ **4. Best Practices**

#### ✅ 4.1 `isLoading` — For Simple Cases

Use when handling only _Loading_ vs _Success_.

```js
return isLoading ? this.renderLoader() : this.renderProductsList()
```

#### ✅ 4.2 `apiStatus` — For All 3 Views

Use when handling _Success_, _Failure_, _Loading_.

```js
switch (apiStatus) {
  case apiStatusConstants.success:
    return this.renderPrimeDealsList()
  case apiStatusConstants.failure:
    return this.renderPrimeDealsFailureView()
  case apiStatusConstants.inProgress:
    return this.renderLoadingView()
  default:
    return null
}
```

#### ✅ 4.3 Initial API State

Define constants for cleaner and bug-free state management.

```js
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
```

---

### 🧠 Quick Summary Table

| Concept          | Variable             | Handles            | Used In            |
| ---------------- | -------------------- | ------------------ | ------------------ |
| Authentication   | `jwt_token`          | Valid user login   | LoginForm          |
| Authorization    | API status codes     | Prime access       | PrimeDealsSection  |
| State (Loading)  | `isLoading`          | Loader toggle      | AllProductsSection |
| State (API)      | `apiStatus`          | API fetch states   | PrimeDealsSection  |
| Protected Routes | `<ProtectedRoute />` | Token-based access | App.js             |

---
