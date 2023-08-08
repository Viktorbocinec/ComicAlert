import './General.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Collectibles from './components/pages/Collectibles';
import Register from './components/pages/Register';
import HomePage from './components/pages/Homepage';



function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/collectibles" exact element={<Collectibles/>} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
