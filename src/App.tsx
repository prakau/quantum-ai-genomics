import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { Layout } from './components/Layout/Layout';
import { store } from './store/store';

// Import pages (to be created)
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Experiments = React.lazy(() => import('./pages/Experiments/Experiments'));
const GeneAnalysis = React.lazy(() => import('./pages/GeneAnalysis/GeneAnalysis'));
const Simulations = React.lazy(() => import('./pages/Simulations/Simulations'));
const Monitoring = React.lazy(() => import('./pages/Monitoring/Monitoring'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/experiments" element={<Experiments />} />
                <Route path="/gene-analysis" element={<GeneAnalysis />} />
                <Route path="/simulations" element={<Simulations />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </React.Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
