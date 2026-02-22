import {useParams, useNavigate} from 'react-router-dom'
import ProductItemDetails from './index'

const ProductItemDetailsWrapper = () => {
  const params = useParams()
  const navigate = useNavigate()

  return (
    <ProductItemDetails
      params={params}
      navigate={navigate}
    />
  )
}

export default ProductItemDetailsWrapper
