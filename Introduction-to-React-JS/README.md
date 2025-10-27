# Introduction to React JS

- MERN Stack
  - Introduction to React JS
- React
  - React.createElement
  - ReactDOM.render
- JSX
  - Embedding Expressions
  - Nesting elements

---

### 📅 **Date:** 27 October 2025

### 🎯 **Focus:** Introduction to React JS

### 🧠 **Goal:**

To understand the basics of React JS, how it runs in HTML, creates elements, and introduces JSX with Babel for rendering UI components efficiently.

---

### 📘 **Concepts Learned**

#### **1. React JS**

- **Definition:**
  React JS is an open-source JavaScript library developed by Facebook for building user interfaces.

- **Why React JS?**

  - Performant websites
  - Fewer lines of code
  - Improves readability
  - Saves development time
  - Open source
  - Reusable components

- **Advantages:**

  - Easy to learn
  - Large developer community
  - Rich toolset for debugging and building apps

---

#### **2. Running JavaScript in HTML**

- JavaScript is included using the `<script>` tag.
- Example:

  ```html
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      const rootElement = document.getElementById("root");
      const element = document.createElement("h1");
      element.textContent = "Hello World!";
      element.classList.add("greeting");
      rootElement.appendChild(element);
    </script>
  </body>
  ```

- **Best Practice:**
  Place `<script>` at the **bottom** of the HTML page to avoid blocking content loading.

---

#### **3. Creating Elements using React JS**

**3.1 React CDN**

```html
<script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
```

**3.2 React.createElement()**

- **Syntax:**

  ```javascript
  React.createElement(type, props);
  ```

  - `type`: HTML tag name (e.g., div, h1, p)
  - `props`: attributes or properties (e.g., className, id)

**Example:**

```javascript
const elementProps = { className: "greeting", children: "Hello world!" };
const elementType = "h1";
const element = React.createElement(elementType, elementProps);
```

**3.3 ReactDOM.render()**

- **Syntax:**

  ```javascript
  ReactDOM.render(reactElement, container);
  ```

- **Example:**

  ```html
  <body>
    <div id="root"></div>
    <script type="module">
      const elementProps = { className: "greeting", children: "Hello world!" };
      const element = React.createElement("h1", elementProps);
      ReactDOM.render(element, document.getElementById("root"));
    </script>
  </body>
  ```

---

#### **4. JSX**

- JSX is a **JavaScript XML-like syntax** that makes writing React elements easier.
- Example:

  ```jsx
  const element = <h1 className="greeting">Hello World</h1>;
  ```

**JSX compiles to:**

```javascript
const element = React.createElement("h1", {
  className: "greeting",
  children: "Hello world!",
});
```

**Important Notes:**

- All JSX tags must be **closed** (e.g., `<img />`, `<br />`)
- **Babel** is used to convert JSX into JavaScript.
- For JSX, use:

  ```html
  <script type="text/babel"></script>
  ```

- **HTML vs JSX Differences:**

| HTML  | JSX       |
| ----- | --------- |
| class | className |
| for   | htmlFor   |

---

#### **4.2 Embedding Variables and Expressions in JSX**

- **Variables:**

  ```jsx
  const name = "Rahul";
  const element = <h1>Hello {name}!</h1>;
  ```

- **Expressions:**

  ```jsx
  const user = { firstName: "Rahul", lastName: "Attuluri" };
  const fullName = (user) => user.firstName + " " + user.lastName;
  const element = <h1>Hello, {fullName(user)}!</h1>;
  ```

---

#### **4.3 Nesting JSX Elements**

ReactDOM.render() returns only one element.
So, wrap multiple elements inside one parent (like `<div>`).

Example:

```jsx
const element = (
  <div>
    <h1 className="greeting">Hello!</h1>
    <p>Good to see you here.</p>
  </div>
);
ReactDOM.render(element, document.getElementById("root"));
```

---
