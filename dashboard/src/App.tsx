/* eslint-disable @typescript-eslint/no-unused-expressions */
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom';
// import keycloak from './Keycloak';
import Navbar from './components/Navbar';
import Router from './helpers/router/Router';
import { Routes } from './helpers/router/config';
import { AuthContext } from './helpers/AuthContextProvider';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Router routes={Routes} />
    </BrowserRouter>
  )
}
function App() {
  const authContext = React.useContext(AuthContext);
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <Box sx={{ display: 'flex' }}>
      <Navbar routes={AppRoutes} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
            <AppRoutes />
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;
