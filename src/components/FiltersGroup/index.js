import { CiSearch } from "react-icons/ci";
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    changeActiveCategoryId,
    changeActiveRatingId,
    clearFilters,
    changeSearchInput,
    searchInput,
    activeCategoryId,
    activeRatingId
  } = props
  return (
    <div className="filtersGroup-bg">
      <div className="search-input-box">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={changeSearchInput}
        />
        <CiSearch size={20} color="#475569" />
      </div>

      <div className="categoryOptions-container">
        <h3 className="co-title">Category</h3>
        <ul className="categoryOptions-list">
          {categoryOptions.map(eachItem => (
            <li key={eachItem.categoryId}>
              <button
                type="button"
                className={`categoryOptionsBtn ${eachItem.categoryId === activeCategoryId ? 'activeCategory': 'inActiveCategory'}`}
                onClick={() => changeActiveCategoryId(eachItem.categoryId)}
              >
                {eachItem.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="ratingList-container">
        <h3 className="rl-title">Rating</h3>
        <ul className="ratingList">
          {ratingsList.map(eachItem => (
            <li key={eachItem.ratingId} className="rating-item">
              <button
                type="button"
                className="ratingBtn"
                onClick={() => changeActiveRatingId(eachItem.ratingId)}
              >
                <img
                  src={eachItem.imageUrl}
                  alt={`rating-${eachItem.ratingId}`}
                  className="rating-img"
                />
                <p className={`${eachItem.ratingId === activeRatingId? 'activeRating': 'inActiveRating'} rating-text`}>& Up</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="clearFilters-btn" onClick={() => clearFilters()}>
        Clear Filters
      </button>
    </div>
  )
}


export default FiltersGroup