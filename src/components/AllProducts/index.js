import { Component } from "react";
import { BsFilterRight } from 'react-icons/bs'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProducts extends Component {
  state = {
    productsList: [],
    activeOption: sortbyOptions[0].optionId,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  componentDidUpdate(prevProps) {
  const {
    activeCategoryId,
    activeRatingId,
    searchInput,
  } = this.props

  if (
    prevProps.activeCategoryId !== activeCategoryId ||
    prevProps.activeRatingId !== activeRatingId ||
    prevProps.searchInput !== searchInput
  ) {
    this.getProducts()
  }
}


  getProducts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress })

    const jwtToken = Cookies.get('jwt_token')
    const { activeOption } = this.state
    const {activeCategoryId, activeRatingId, searchInput} = this.props
    const productsApiUrl = `https://apis.ccbp.in/products?sort_by=${activeOption}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(productsApiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const formattedData = data.products.map(eachItem => ({
        id: eachItem.id,
        brand: eachItem.brand,
        price: eachItem.price,
        rating: eachItem.rating,
        title: eachItem.title,
        imageUrl: eachItem.image_url,
      }))

      this.setState({
        productsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  onChangeOptionId = event => {
    this.setState(
      { activeOption: event.target.value },
      this.getProducts
    )
  }

  renderSuccessView = () => {
    const { productsList } = this.state
    if (productsList.length === 0) {
      return this.renderNoProductsFound()
    }
    return (
      <ul className="products-list-container">
        {productsList.map(eachItem => (
          <ProductCard
            key={eachItem.id}
            productCardDetails={eachItem}
          />
        ))}
      </ul>
    )
  }

  renderLodingView = () => (
    <div
      className="allProducts-loader-container"
      data-testid="loader"
    >
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderNoProductsFound = () => (
    <div className="noProductsFound-bg">
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" alt="no products" className="noProducts-img"/>
      <h3 className="npf-heading">No Products Found</h3>
      <p className="npf-text">We could not find any products. Try other filters.</p>
    </div>
  )

  renderFailureView = () => (
    <div className="allProductsfailure-bg">
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png" alt="products failure" className="productsFailure-img"/>
      <h3 className="apf-heading">Oops! Something Went Wrong</h3>
      <p className="apf-text">We are having some trouble processing your request.<br/>Please try again.</p>
    </div>
  )

  renderAllProducts = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLodingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const { activeOption } = this.state

    return (
      <div className="allProducts-bg">
        <div className="allProductsHeader">
          <h3 className="aph-heading">All Products</h3>
          <div className="sortBy-box">
            <BsFilterRight color="#475569" size={25} />
            <label htmlFor="sort" className="sortByOption-label">
              Sort by
            </label>
            <select
              id="sort"
              className="sortByOption-container"
              value={activeOption}
              onChange={this.onChangeOptionId}
            >
              {sortbyOptions.map(eachItem => (
                <option
                  key={eachItem.optionId}
                  value={eachItem.optionId}
                >
                  {eachItem.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="allProductsRender-container">
          {this.renderAllProducts()}
        </div>
      </div>
    )
  }
}

export default AllProducts
