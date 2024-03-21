import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../cartSummary'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const removeAll = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          {cartList.length === 0 ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button type="button" className="remove" onClick={removeAll}>
                  Remove All
                </button>
                <CartListView />
                <CartSummary />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
