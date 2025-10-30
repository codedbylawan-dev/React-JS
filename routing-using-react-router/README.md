- Web Apps
  - Single Page Apps
  - Multiple Page Apps
- Routing
  - react-router-dom
- react-router-dom
  - BrowserRouter
  - Link
  - Route
  - Switch

---

## 🚀 **Routing Using React Router**

### 🧩 1. Web Apps Types

React apps are **Single Page Applications (SPAs)** — meaning they load one main
HTML file and swap components dynamically.

| Type                      | Description                                            | Example                  |
| ------------------------- | ------------------------------------------------------ | ------------------------ |
| **MPA (Multi-Page App)**  | Each URL loads a separate HTML file from the server.   | Traditional websites     |
| **SPA (Single-Page App)** | One HTML page that dynamically loads React components. | React, Angular, Vue apps |

**✅ SPA Advantages:**

- Faster navigation (only new components are loaded)
- Smooth transitions
- Better user experience

---

## 🧭 **2. React Router Components**

React Router lets you navigate between different components **without reloading
the page**.

Install it first:

```bash
npm install react-router-dom
```

### 🧱 Core Components

#### **1️⃣ BrowserRouter**

Wraps your entire app to enable routing.

```jsx
import {BrowserRouter} from 'react-router-dom'
;<BrowserRouter>
  <App />
</BrowserRouter>
```

---

#### **2️⃣ Link**

Used instead of `<a>` tag for navigation between routes (prevents full reload).

```jsx
import { Link } from "react-router-dom"

<Link to="/about">About</Link>
<Link to="/contact">Contact</Link>
```

🟢 `to` → defines the path to navigate to.

---

#### **3️⃣ Route**

Decides which component should render for a particular path.

```jsx
import { Route } from "react-router-dom"

<Route path="/about" component={About} />
<Route path="/contact" component={Contact} />
```

✅ Use `exact` to match paths precisely:

```jsx
<Route exact path="/" component={Home} />
```

---

#### **4️⃣ Switch**

Ensures that only **one route** renders at a time. If no paths match, it renders
a fallback component (e.g., `NotFound`).

```jsx
import {Switch, Route} from 'react-router-dom'
;<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route component={NotFound} /> {/* fallback */}
</Switch>
```

---

## 💻 **3. Example Structure**

### 📁 File: `src/App.js`

```jsx
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
```

---

### 📁 File: `src/components/Header/index.js`

```jsx
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="nav-menu">
    <ul>
      <li>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/contact">
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
```

---

### 🧠 **Quick Summary**

| Component         | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| **BrowserRouter** | Enables routing in your app                           |
| **Link**          | Used for navigation without page reload               |
| **Route**         | Maps paths to components                              |
| **Switch**        | Ensures only one route renders; used for 404 handling |

---
