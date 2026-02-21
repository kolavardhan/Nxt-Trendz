import { Component } from "react";
import { ThreeDots } from 'react-loader-spinner'
import ProductCard from '../ProductCard'
import Cookies from 'js-cookie'
import './index.css'


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeDealsSection extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    primeDeals: [],
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const primeDealsUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(primeDealsUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.prime_deals.map(eachItem => ({
        id: eachItem.id,
        availability: eachItem.availability,
        brand: eachItem.brand,
        description: eachItem.description,
        imageUrl: eachItem.image_url,
        price: eachItem.price,
        rating: eachItem.rating,
        style: eachItem.style,
        title: eachItem.title,
        total_reviews: eachItem.total_reviews,
      }))

      this.setState({
        primeDeals: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="primeDealsSection-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="pdsf-img"
      />
    </div>
  )

  renderSuccessView = () => {
    const {primeDeals} = this.state
    return (
      <div className="primeDealsSection-Success-container">
        <h1 className="pdssc-title">Exclusive Prime Deals</h1>
        <ul className="pd-continer">
          {primeDeals.map(eachItem => (
            <ProductCard
              key={eachItem.id}
              productCardDetails={eachItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="primeDealsSection-loader-container"
      data-testid="loader"
    >
      <ThreeDots color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderPrimeDealsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="primeDealsSection-bg">
        {this.renderPrimeDealsSection()}
      </div>
    )
  }
}

export default PrimeDealsSection
