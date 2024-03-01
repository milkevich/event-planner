import './Shared/Styles/Variables.scss'
import NavigationBar from './Components/NavigationBar'
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import SectionInfo from './Components/SectionInfo';
import { Outlet } from 'react-router-dom';


function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Outlet/>
      </ThemeProvider>
    </div>
  )
}

export default App
