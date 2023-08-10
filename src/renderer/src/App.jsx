import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { MenuContextProvider } from '@context/menuContext';
import MainPage from '@pages/MainPage'
import MenuPage from '@pages/MenuPage';
import { ThemeProvider, createTheme } from '@mui/material';

let theme = createTheme({
  
  typography: {
    fontFamily: 'Pretendard Variable',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
