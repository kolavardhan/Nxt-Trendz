import Header from '../Header'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Home = () => {
    const navigate = useNavigate() 
    const onClickShopNow = () => {
        navigate('/products')
    }
    return <>
        <Header />
        <div className='home-bg'>
            <div className='home-content'>
                <div className='home-left'>
                    <h1 className='hl-title'>Clothes That Get YOU Noticed</h1>
                    <p className='hl-text'>
                        Fashion is part of the daily air and it does not quite help that it changes all the time. Clothes have always been a marker of the era and we are in one now. Your fashion makes you been seen and heard that way you are. So, celebrate the seasons new and exciting fashion in your own way.
                    </p>
                    <button type='button' className='shopNow-btn' onClick={onClickShopNow}>Shop Now</button>
                </div>
                <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' alt='clothes that get you noticed' className='home-img'/>
            </div>
        </div>
    </> 
}

export default Home 