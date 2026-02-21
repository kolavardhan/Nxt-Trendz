import './index.css'

const ProductCard = props => {
  const { productCardDetails } = props
  const { imageUrl, title, brand, price, rating } = productCardDetails

  return (
    <li className="product-item">
      <img src={imageUrl} alt={title} className="pi-img" />
      <h3 className="pi-title">{title}</h3> 
      <p className="pi-brand">{`by ${brand}`}</p>
      <div className="price-rating-container">
        <p className="pi-price">{`Rs ${price}/-`}</p>
        <div className="rating-box">
          <p className="pi-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default ProductCard
