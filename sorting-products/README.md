# Sorting Products

- Sorting Products
  - Price High to Low
  - Price Low to High
- Installing Third-Party Packages
  - react-icons

---

## 🛒 Sorting Products — Cheat Sheet

---

### 🧠 **Concepts in Focus**

| Concept               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `setState()` Callback | Runs a function _after_ the state update completes      |
| React Icons           | Add visual icons like filters, delete, social icons     |
| Sorting Products      | Change product order dynamically via dropdown selection |

---

### ⚙️ **1. setState() — Callback Function**

React’s `setState()` is **asynchronous**, meaning the state update doesn’t
happen immediately. You can pass a **callback** to ensure some code runs _after_
the update.

#### 🧩 Syntax:

```jsx
this.setState({property: value}, () => {
  // callback code after state update
})
```

#### ✅ Example:

```jsx
this.setState({activeOptionId: event.target.value}, this.getProducts)
```

> Here, `getProducts()` is called **only after** the new sorting option is set.

---

### 💡 **2. React Icons**

`react-icons` is a library that provides access to **multiple icon packs**
(Bootstrap, FontAwesome, Material, etc.).

#### 🛠️ Installation:

```bash
npm install react-icons
```

#### 🔍 Search Icons:

Go to
[https://react-icons.github.io/react-icons](https://react-icons.github.io/react-icons)
→ Find the icon → Click to copy name → Check prefix (category).

#### 🧩 Import Example:

```jsx
import {BsFilterRight} from 'react-icons/bs'
import {FaFacebookF} from 'react-icons/fa'
import {MdDelete} from 'react-icons/md'

const IconsDemo = () => (
  <div>
    <BsFilterRight />
    <FaFacebookF />
    <MdDelete />
  </div>
)
```

**Prefix Reference Table:**

| Prefix | Library         |
| ------ | --------------- |
| `Bs`   | Bootstrap       |
| `Fa`   | FontAwesome     |
| `Md`   | Material Design |
| `Ai`   | Ant Design      |
| `Gi`   | Game Icons      |

---

### 🛍️ **3. Sorting Products Implementation**

The goal: Show a dropdown (using React icons) to sort products by **Price
(High-Low / Low-High)** dynamically.

---

### 🧱 Component Flow

| Component            | Responsibility                                  |
| -------------------- | ----------------------------------------------- |
| `ProductsHeader`     | Shows the sort dropdown                         |
| `AllProductsSection` | Manages sorting logic, state & API calls        |
| `ProductCard`        | Displays product info                           |
| `Products`           | Combines PrimeDealsSection + AllProductsSection |

---

### 📦 **AllProductsSection.js**

#### Imports:

```jsx
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import './index.css'
```

#### Sort Options:

```js
const sortbyOptions = [
  {optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)'},
  {optionId: 'PRICE_LOW', displayText: 'Price (Low-High)'},
]
```

#### State & Lifecycle:

```jsx
class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
  }

  componentDidMount() {
    this.getProducts()
  }
```

#### Fetching Products:

```jsx
getProducts = async () => {
  this.setState({isLoading: true})
  const jwtToken = Cookies.get('jwt_token')
  const {activeOptionId} = this.state
  const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
  const options = {
    headers: {Authorization: `Bearer ${jwtToken}`},
    method: 'GET',
  }

  const response = await fetch(apiUrl, options)
  if (response.ok) {
    const data = await response.json()
    const updatedData = data.products.map(each => ({
      title: each.title,
      brand: each.brand,
      price: each.price,
      rating: each.rating,
      id: each.id,
      imageUrl: each.image_url,
    }))
    this.setState({productsList: updatedData, isLoading: false})
  }
}
```

#### Sort Change Handler:

```jsx
updateActiveOptionId = newOptionId => {
  this.setState({activeOptionId: newOptionId}, this.getProducts)
}
```

> The **callback** ensures that products are refetched _after_ the sort option
> updates.

#### Render:

```jsx
render() {
  const { isLoading, productsList, activeOptionId } = this.state
  return (
    <div className="all-products-section">
      <ProductsHeader
        sortbyOptions={sortbyOptions}
        activeOptionId={activeOptionId}
        updateActiveOptionId={this.updateActiveOptionId}
      />
      {isLoading ? (
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      ) : (
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

### 🧭 **ProductsHeader.js**

```jsx
import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId, updateActiveOptionId} = props

  const onChangeSortby = event => {
    updateActiveOptionId(event.target.value)
  }

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-container">
        <BsFilterRight className="filter-icon" />
        <p className="sort-by">Sort by</p>
        <select
          value={activeOptionId}
          onChange={onChangeSortby}
          className="sort-select"
        >
          {sortbyOptions.map(option => (
            <option key={option.optionId} value={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
```

---

### ⚡ **Quick Summary Table**

| Concept                  | Purpose                      | Example                                        |
| ------------------------ | ---------------------------- | ---------------------------------------------- |
| `setState(callback)`     | Run logic after state update | `this.setState(..., this.getProducts)`         |
| React Icons              | Add icons                    | `import {BsFilterRight} from 'react-icons/bs'` |
| `updateActiveOptionId()` | Change sort option           | Triggers re-fetch                              |
| `Loader`                 | Show loading spinner         | `<Loader type="TailSpin" ... />`               |

---
