import { useNavigate } from "react-router-dom";
import Cart from ".";

const CartWrapper = () => {
    const navigate = useNavigate()
    return <Cart navigate={navigate}/>
}

export default CartWrapper