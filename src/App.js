import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import TypographyPage from './pages/Typography';
import ButtonPage from './pages/Button';
import IconPage from './pages/Icon';
import CustomStyle from './pages/CustomStyle';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Layout from './Component/Layout';
import MapIntegration from './pages/MapIntegration';
import ResponsiveDrawer from './Component/ResponsiveDrawer';
// import ThreeScene from './pages/ThreeD';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  }
})

function App() {
  return (
    <>


      <ResponsiveDrawer />
    </>

  );
}

export default App;
