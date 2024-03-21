import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productIndex = cartList.findIndex(item => item.id === product.id)
    if (productIndex !== -1) {
      const updatedCart = [...cartList]
      updatedCart[productIndex].quantity += product.quantity
      this.setState({cartList: updatedCart})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterData = cartList.filter(each => each.id !== id)
    this.setState({cartList: filterData})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedData = cartList.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    this.setState({cartList: updatedData})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedData = cartList.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          acc.push({...item, quantity: item.quantity - 1})
        }
      } else {
        acc.push(item)
      }
      return acc
    }, [])
    this.setState({cartList: updatedData})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}
export default App
