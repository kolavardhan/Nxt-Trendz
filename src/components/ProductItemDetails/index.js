import { Component } from 'react'
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { FaStar } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import ProductCard from '../ProductCard';
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
}

class ProductItemDetails extends Component {
    state = {
        apiStatus: apiStatusConstants.initial,
        productData: {},
        similarProductsData: [],
        quantity: 1
    }

    componentDidMount() {
        this.productDetailsApi()
    }

    componentDidUpdate(prevProps) {
        const prevId = prevProps.params.id
        const currentId = this.props.params.id

        if (prevId !== currentId) {
        this.productDetailsApi()
        }
    }

    productDetailsApi = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const {params} = this.props
        const {id} = params
        const jwtToken = Cookies.get("jwt_token")
        const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }

        const response = await fetch(productDetailsApiUrl, options)
        if (response.ok === true) {
            const data = await response.json()
            const formattedProductData = {
                availability: data.availability,
                brand: data.brand,
                description: data.description,
                id: data.id,
                imageUrl: data.image_url,
                price: data.price,
                rating: data.rating,
                style: data.style,
                title: data.title,
                totalReviews: data.total_reviews,
            }
            const formattedSimilarProductsData = data.similar_products.map((eachItem) => ({
                availability: eachItem.availability,
                brand: eachItem.brand,
                description: eachItem.description,
                id: eachItem.id,
                imageUrl: eachItem.image_url,
                price: eachItem.price,
                rating: eachItem.rating,
                style: eachItem.style,
                title: eachItem.title,
                totalReviews: eachItem.total_reviews,
            }))
            
            this.setState({apiStatus: apiStatusConstants.success, productData: formattedProductData, similarProductsData: formattedSimilarProductsData})
        }
        else if (response.status === 401) {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
    }

    incrementQuantity = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity + 1
        })) 
    }

    decrementQuantity = () => {
        this.setState((prevState) => ({
            quantity: prevState.quantity > 1? prevState.quantity - 1: prevState.quantity
        }))
    }

    renderSuccessView = () => {
        const {productData, similarProductsData, quantity} = this.state
        const {imageUrl, title, price, rating, totalReviews, description, availability, brand} = productData
        return (
            <div className='productItemDetails-bg'>
            <div className='pid-top-section'>
                <img src={imageUrl} alt={title} className='pidts-img'/>
                <div className='productDetails-container'>
                    <div className='pdc-section1'>
                        <h2 className='pdc-title'>{title}</h2>
                        <p className='pdc-price'>{`Rs ${price}/-`}</p>
                        <div className='pdc-rating-review-container'>
                            <div className='pdc-rating-container'>
                                <p className='pdc-rating'>{rating}</p>
                                <FaStar color='#ffffff' size={16}/>
                            </div>
                            <p className='pdc-review'>{`${totalReviews} Reviews`}</p>
                        </div>
                        <p className='pdc-description'>{description}</p>
                        <p className='pdc-availability'><span className='pdc-span'>Availability:</span> {availability}</p>
                        <p className='pdc-brand'><span className='pdc-span'>Brand:</span> {brand}</p>
                    </div>
                    <div className='pdc-changeQuantity'>
                        <button type='button' className='changeQuantiy-btn' onClick={this.incrementQuantity}>
                            <CiSquarePlus color='#475569' size={18} className='icon'/>
                        </button>
                        <p className='pdc-quantity'>{quantity}</p>
                        <button type='button' className='changeQuantiy-btn' onClick={this.decrementQuantity}>
                            <CiSquareMinus color='#475569' size={18} className='icon'/>
                        </button>
                    </div>
                    <button type='button' className='addToCart-btn'>ADD TO CART</button>
                </div>
            </div>
            <div className='pid-similarProducts'>
                <h2 className='sp-title'>Similar Products</h2>
                <ul className='similarProducts-list'>
                    {similarProductsData && similarProductsData.map((eachItem) =>
                    <li key={eachItem.id}>
                        <Link className='similarProducts-link' to={`/products/${eachItem.id}`}> 
                        <ProductCard key={eachItem.id} productCardDetails={eachItem}/>
                    </Link>
                    </li>
                    )}
                </ul>
            </div>
        </div>
        )
    }

    renderLoadingView = () => (
    <div
      className="productItemDetails-loader-container"
      data-testid="loader"
    >
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
    )

    renderFailureView = () => (
        <div className='productItemDetailsFaliure-bg'>
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png' alt='error view' className='errorView-img'/>
            <h2 className='pidf-title'>Product Not Found</h2>
            <button type='button' className='cs-btn' onClick={this.continueShopping}>Continue Shopping</button>
        </div>
    )

    continueShopping = () => {
        const {navigate} = this.props
        navigate('/products')
    }


    renderProductDetails = () => {
        const {apiStatus} = this.state
        switch(apiStatus) {
            case (apiStatusConstants.success):
                return this.renderSuccessView()
            case (apiStatusConstants.inProgress):
                return this.renderLoadingView()
            case (apiStatusConstants.failure):
                return this.renderFailureView()
            default:
                return null
        }
    }

    render() {
        return <>
        <Header/>
        {this.renderProductDetails()}
        </> 
    }
}

export default ProductItemDetails