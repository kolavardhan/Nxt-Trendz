import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;
