import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
} from '@mui/material';
import {
  Science,
  Timeline,
  Biotech,
  Dashboard,
  CloudQueue,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Experiments', icon: <Science />, path: '/experiments' },
  { text: 'Gene Analysis', icon: <Biotech />, path: '/gene-analysis' },
  { text: 'Simulations', icon: <Timeline />, path: '/simulations' },
  { text: 'IoT Monitoring', icon: <CloudQueue />, path: '/monitoring' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem onClick={() => handleNavigation(item.path)} sx={{ cursor: 'pointer' }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            {item.text === 'Dashboard' && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </StyledDrawer>
  );
};
