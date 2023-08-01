import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import MainPage from '@pages/MainPage'
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/menu' element={<MenuPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
