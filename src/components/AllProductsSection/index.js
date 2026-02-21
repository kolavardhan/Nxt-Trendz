import { Component } from "react";
import FiltersGroup from '../FiltersGroup'
import AllProducts from '../AllProducts'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    activeCategoryId: '',
    activeRatingId: '',
    searchInput: '',
  }

  changeActiveCategoryId = categoryId => {
    this.setState({activeCategoryId: categoryId})
  }

  changeActiveRatingId = ratingId => {
    this.setState({activeRatingId: ratingId})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clearFilters = () => {
    this.setState({
      activeCategoryId: '',
      activeRatingId: '',
      searchInput: '',
    })
  }

  render() {
    const {activeCategoryId, activeRatingId, searchInput} = this.state

    return (
      <div className="allProductsSection-bg">
        <div className="filtersGroup-allProducts-container">
          <FiltersGroup
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            changeActiveCategoryId={this.changeActiveCategoryId}
            changeActiveRatingId={this.changeActiveRatingId}
            changeSearchInput={this.changeSearchInput}
            searchInput={searchInput}
            clearFilters={this.clearFilters}
            activeCategoryId={activeCategoryId}
            activeRatingId={activeRatingId}
          />
          <AllProducts
            activeCategoryId={activeCategoryId}
            activeRatingId={activeRatingId}
            searchInput={searchInput}
          />
        </div>
      </div>
    )
  }
}


export default AllProductsSection