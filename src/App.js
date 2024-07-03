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
      {/* <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/typography">
              <TypographyPage />
            </Route>
            <Route path="/button">
              <ButtonPage />
            </Route>
            <Route path="/icon">
              <IconPage />
            </Route>
            <Route path="/custom-style">
              <CustomStyle />
            </Route>
            <Route path="/map-integration">
              <MapIntegration />
            </Route>
            <Route path="/3d">
              <ThreeScene />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider> */}

      <ResponsiveDrawer />
    </>

  );
}

export default App;
