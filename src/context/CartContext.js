import React from 'react'

const CartContext = React.createContext({
    cartList: [],
    addCartItem : () => {},
    removeCartItem: () => {},
    removeAll: () => {},
    incrementProduct: () => {},
    decrementProduct: () => {}
})
 
export default CartContext