/* eslint-disable @typescript-eslint/no-unused-expressions */
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Router from './helpers/router/Router';
import { Routes } from './helpers/router/config';


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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
        <BrowserRouter>
            <Navbar />
            <Router routes={Routes()} />
        </BrowserRouter>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
