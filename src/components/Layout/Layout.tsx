import React, { useState } from 'react';
import { Box, CssBaseline, styled } from '@mui/material';
import { AppBar } from './AppBar';
import { Sidebar } from './Sidebar';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '100%',
  minHeight: '100vh',
  marginTop: 64, // AppBar height
  backgroundColor: theme.palette.background.default,
}));

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar onMenuClick={handleSidebarToggle} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Main>
        {children}
      </Main>
    </Box>
  );
};
