import Header from "../Header";
import CartContext from "../../context/CartContext";
import CartItem from '../CartItem'
import './index.css'

const Cart = (props) => {
    const emptyCartShopNow = () => {
        const {navigate} = props
        navigate('/products')
    }
    return <>
        <Header/>
        <CartContext.Consumer>
            {
                value => {
                    const {cartList, removeAll} = value
                    const onClickRemoveAllItems = () => {
                        removeAll()
                    }
                    const summaryText = cartList.length > 1 ? 'items': 'item'
                    const totalAmount = cartList.reduce((sum, eachProduct) => sum + (eachProduct.quantity * eachProduct.price), 0 )
                    if (cartList.length === 0) {
                        return (
                            <div className="empty-cart-view">
                                <img  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" alt="cart empty" className="ec-img"/>
                                <h2 className="ec-title">Your Cart Is Empty</h2>
                                <button type="button" className="ec-shopNow-btn" onClick={emptyCartShopNow}>Shop Now</button>
                            </div>
                        )
                    }
                    return (
                        <div className="cart-container">
                            <div className="cc-content-box">
                                <h2 className="cc-title">My Cart</h2>
                                <div className="cartItem-removeAll-container">
                                    <div className="removeAll-box">
                                        <button type="button" className="removeAll-btn" onClick={onClickRemoveAllItems}>Remove All</button>
                                    </div>
                                    <ul className="cartItem-container">
                                        {cartList.map((eachProduct) => <CartItem key={eachProduct.id} cartItem={eachProduct}/>)}
                                    </ul>
                                </div>
                                <div className="order-summary-container">
                                    <div className="summary-card">
                                        <h2 className="sc-title">Order Total: <span className="sc-amount">{`Rs ${totalAmount}/-`}</span></h2>
                                        <p className="sc-text">{`${cartList.length} ${summaryText} in cart`}</p>
                                        <button type="button" className="checkout-btn">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </CartContext.Consumer>
    </> 
}

export default Cart