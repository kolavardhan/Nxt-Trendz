import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <div className="header-bg">
      <div className="header-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div className="routes-logout-container">
          <Link to="/" className="header-link">
            <p className="route-text">Home</p>
          </Link>
          <Link to="/products" className="header-link">
            <p className="route-text">Products</p>
          </Link>
          <Link to="/cart" className="header-link">
            <p className="route-text">Cart</p>
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
