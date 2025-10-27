# Components & Props

- Components
  - Creating a Component
  - Reusable Components
  - Composable Components
- Props
  - Passing Props
  - Accessing Props
- Create React App
  - React Project Setup
  - Starting the Application

---

### 📅 **Date:** 27 October 2025

### 🎯 **Focus:** Components & Props in React JS

### 🧠 **Goal:**

To understand React components, how to pass and access props, the concepts of reusability and composability, and how to use third-party tools like **create-react-app** for real-world development.

---

### 📘 **Concepts Learned**

#### **1. Component**

- A **Component** is a JavaScript function that returns a **JSX element**.
- It must start with a **capital letter** (e.g., `Welcome`) because lowercase names are treated as HTML tags.

**Example:**

```jsx
const Welcome = () => <h1 className="message">Hello, User</h1>;
ReactDOM.render(<Welcome />, document.getElementById("root"));
```

- Called with **self-closing tags** like `<Welcome />`.

---

#### **1.1 Properties (Props)**

**Definition:**
Props are used to pass **data** from one component to another, similar to attributes in HTML.

##### **1.1.1 Passing Props**

**Syntax:**

```jsx
<Component propName1="value1" propName2="value2" />
```

**Example:**

```jsx
const Welcome = () => <h1 className="message">Hello, User</h1>;
ReactDOM.render(
  <Welcome name="Rahul" greeting="Hello" />,
  document.getElementById("root")
);
```

##### **1.1.2 Accessing Props**

Props are received as an **object parameter** in a component.

**Syntax:**

```javascript
const Component = (props) => {
  // Access props here
};
```

**Example:**

```jsx
const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};
ReactDOM.render(
  <Welcome name="Rahul" greeting="Hello" />,
  document.getElementById("root")
);
```

---

#### **1.2 Component is Reusable**

A component can be used **multiple times** in an application with different props.

**Example:**

```jsx
const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};

ReactDOM.render(
  <div>
    <Welcome name="Rahul" greeting="Hello" />
    <Welcome name="Ram" greeting="Hi" />
  </div>,
  document.getElementById("root")
);
```

---

#### **1.3 Component is Composable**

React allows **nesting components** — meaning one component can be included inside another.

**Example:**

```jsx
const Welcome = (props) => {
  const { name, greeting } = props;
  return (
    <h1 className="message">
      {greeting}, {name}
    </h1>
  );
};

const Greetings = () => (
  <div>
    <Welcome name="Rahul" greeting="Hello" />
    <Welcome name="Ram" greeting="Hi" />
  </div>
);

ReactDOM.render(<Greetings />, document.getElementById("root"));
```

---

#### **2. Third-party Packages**

Building large React apps manually involves a lot of setup.
**Facebook created `create-react-app`** — a tool that provides a pre-configured setup for React applications.

---

##### **2.1 create-react-app**

**Installation Command:**

```bash
npm install -g create-react-app
```

**Creating a New App:**

```bash
create-react-app myapp --use-npm
```

---

##### **2.1.2 Folder Structure**

| Folder/File           | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| **public/**           | Contains assets like images, icons, and videos             |
| **src/**              | Contains the React components and main code                |
| **node_modules/**     | Contains dependencies and sub-dependencies                 |
| **package-lock.json** | Ensures consistent dependency versions across environments |

> `index.js` (in src folder) is the **entry point** of the React app, where `App.js` and `App.css` are imported.

---

##### **2.1.3 Starting the Application**

Run this command inside the project folder:

```bash
npm start
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

> All React modules must have a `.js` extension.

---

#### **2.2 Pre-Configured Tools in create-react-app**

- **Live Editing:** Auto-refresh for real-time changes
- **ESLint:** Detects programming/syntax errors
- **Prettier:** Ensures code formatting consistency
- **Babel:** Compiles JSX into JavaScript
- **Webpack:** Bundles modules into one or more optimized files

---
