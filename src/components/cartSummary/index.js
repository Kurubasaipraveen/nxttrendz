import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const sum = cartList.reduce(
        (accumulator, current) =>
          accumulator + current.price * current.quantity,
        0,
      )

      return (
        <div className="order-summary">
          <h1 className="total">
            Order Total : RS <span className="sum">{sum}/-</span>
          </h1>
          <p className="count">{cartList.length} items in cart</p>
          <button type="button" className="check-out">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
