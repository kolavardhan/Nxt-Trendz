import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import CartContext from "../../context/CartContext";

import './index.css'

const CartItem = (props) => {
    return (
        <CartContext.Consumer>
            {value => {
                const {removeCartItem, incrementProduct, decrementProduct} = value
                const {cartItem} = props
                const {imageUrl, title, brand, quantity, price, id} = cartItem

                const onClickRemoveItem = () => {
                    removeCartItem(id)
                }

                const onClickIncrementProduct = () => {
                    incrementProduct(id)
                }

                const onClickDecrementProduct = () => {
                    decrementProduct(id)
                }

                return (
                <li className="cart-item">
                    <div className="ci-section1">
                        <img src={imageUrl} alt={title} className="ci-img"/>
                        <div className="ci-title-brand">
                            <h3 className="ci-title">{title}</h3>
                            <p className="ci-brand">{`by ${brand}`}</p>
                        </div>
                    </div>
                    <div className='pdc-changeQuantity'>
                        <button type='button' className='changeQuantiy-btn' onClick={onClickIncrementProduct}>
                            <CiSquarePlus color='#475569' size={18} className='icon'/>
                        </button>
                        <p className='pdc-quantity'>{quantity}</p>
                        <button type='button' className='changeQuantiy-btn' onClick={onClickDecrementProduct}>
                            <CiSquareMinus color='#475569' size={18} className='icon'/>
                        </button>
                    </div>
                    <div className="amount-removeBtn-container">
                        <p className="ci-amount">{`Rs ${(price) * (quantity)}/-`}</p>
                        <button type="button" className="ci-remove-btn" onClick={onClickRemoveItem}>
                            <IoIosCloseCircle color="#475569" size={18}/>
                        </button>
                    </div>
                </li>
            )
            }}
        </CartContext.Consumer>
    )
    
}

export default CartItem