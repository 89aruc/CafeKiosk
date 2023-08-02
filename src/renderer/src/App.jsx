import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { MenuContextProvider } from './context/menuContext';
import MainPage from '@pages/MainPage'
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <MenuContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/menu' element={<MenuPage />} />
          </Routes>
        </Router>
      </div>
    </MenuContextProvider>
  )
}

export default App
