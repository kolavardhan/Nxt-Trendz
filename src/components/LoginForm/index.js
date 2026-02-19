import { Component } from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css' 

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        errorMsg: '',
        showSubmitError: false,
        usernameError: '',
        passwordError: ''
    }

    onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {expires: 1, path: '/'})
    }

    onSubmitFailure = errorMsg => {
        this.setState({showSubmitError: true, errorMsg}) 
    }

    onSubmitLoginApi = async event => {
        event.preventDefault()
        const {username, password} = this.state
        if (username.trim() !== '' || password.trim() !== '') {
            const userDetails = {username, password}
            const options = {
                method: 'POST',
                body: JSON.stringify(userDetails)
            }
            const loginUrl = "https://apis.ccbp.in/login"
            const response = await fetch(loginUrl, options)
            const data = await response.json()

            if (response.ok) {
                this.onSubmitSuccess(data.jwt_token)
            }
            else {
                this.onSubmitFailure(data.error_msg)
            }
        }
    }

    onChangeUsername = event => {
        this.setState({username: event.target.value})
    }

    onChangePassword = event => {
        this.setState({password: event.target.value})
    }

    onBlurUserName = () => {
        const {username} = this.state
        this.setState({
            usernameError: username.trim() === "" ? "*Username is required": ""
        })
    }

    onBlurPassword = () => {
        const {password} = this.state
        this.setState({
            passwordError: password.trim() === "" ? "*Password is required": ""
        })
    }

    render() {
        const {username, password, showSubmitError, errorMsg, usernameError, passwordError} = this.state
        const jwtToken = Cookies.get("jwt_token")
        if (jwtToken !== undefined) {
            return <Navigate to="/" />
        }
        return <div className="loginForm-bg">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login" className='webiste-login-img'/>
            <div className='loginForm-card'>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt='website logo' className='form-website-logo'/>
                <form className='form-container' onSubmit={this.onSubmitLoginApi}>
                    <div className='input-container'>
                        <label htmlFor='username' className='input-label'>USERNAME</label>
                        <input type="text" placeholder='Username' className='input-box' onBlur={this.onBlurUserName} value={username} onChange={this.onChangeUsername}/>
                        {usernameError && <p className='error-msg'>{usernameError}</p>}
                    </div>
                    <div className='input-container'>
                        <label htmlFor='password' className='input-label'>PASSWORD</label>
                        <input type="password" placeholder='Password' className='input-box' onBlur={this.onBlurPassword} value={password} onChange={this.onChangePassword}/>
                        {passwordError && <p className='error-msg'>{passwordError}</p>}
                    </div>
                    <div className='loginBtn-errorMsg-box'>
                        <button type='submit' className='login-btn'>Login</button>
                        {showSubmitError && <p className='error-msg'>{`*${errorMsg}`}</p>}
                    </div>
                </form>
            </div>
        </div>
    }
}

export default LoginForm
