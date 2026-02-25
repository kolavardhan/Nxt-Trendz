import { Component } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Products from './components/Products'
import CartWrapper from './components/Cart/CartWrapper'
import ProductItemDetailsWrapper from './components/ProductItemDetails/ProductItemDetailsWrapper'
import NotFound from './components/NotFound'

class App extends Component {
  state = {
    cartList: [] 
  }

  componentDidMount() {
    const storedCartList = localStorage.getItem('cartList')

    if (storedCartList) {
      this.setState({cartList: JSON.parse(storedCartList)})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartList !== this.state.cartList) {
      localStorage.setItem('cartList', JSON.stringify(this.state.cartList))
    }
  }

  addCartItem = (product) => {
    this.setState((prevState) => {
      const existingProduct = prevState.cartList.find((eachProduct) => eachProduct.id === product.id)
      if (existingProduct) {
        const updatedCartList = prevState.cartList.map((eachProduct) => {
        if (eachProduct.id === product.id) {
          return {...eachProduct, quantity: eachProduct.quantity + product.quantity}
        }
        else {
          return eachProduct
        }
      })
      return {cartList: updatedCartList}
      }
      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter((eachProduct) => eachProduct.id !== id)
    }))
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  incrementProduct = (id) => {
    this.setState((prevState) => {
      const updatedCartList = prevState.cartList.map((eachProduct) => {
        if (eachProduct.id === id) {
          return {...eachProduct, quantity: eachProduct.quantity + 1}
        }
        return eachProduct
      })
      return {cartList: updatedCartList}
    })
  }

  decrementProduct = (id) => {
    this.setState((prevState) => {
      const updatedCartList = prevState.cartList.map((eachProduct) => {
        if (eachProduct.id === id) {
          if (eachProduct.quantity > 1) {
            return {...eachProduct, quantity: eachProduct.quantity - 1}
          }
        }
        return eachProduct
      })
      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider value={
        {
          cartList, addCartItem:this.addCartItem,
          removeCartItem: this.removeCartItem, removeAll: this.removeAll,
          incrementProduct: this.incrementProduct,
          decrementProduct: this.decrementProduct
        }
      }>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginForm />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartWrapper />
                    </ProtectedRoute>
                  }
                />

                <Route path="/products/:id" 
                  element={
                    <ProtectedRoute>
                      <ProductItemDetailsWrapper/>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/not-found" />} />
                <Route path="/not-found" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
      </CartContext.Provider>
  )
  }
}

export default App
