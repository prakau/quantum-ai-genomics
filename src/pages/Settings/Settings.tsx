import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Switch, FormGroup, FormControlLabel } from '@mui/material';

const Settings: React.FC = () => {
  const [state, setState] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.darkMode}
                  onChange={handleChange}
                  name="darkMode"
                />
              }
              label="Dark Mode"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.notifications}
                  onChange={handleChange}
                  name="notifications"
                />
              }
              label="Enable Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.autoSave}
                  onChange={handleChange}
                  name="autoSave"
                />
              }
              label="Auto Save"
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
