// src/components/Header.jsx
import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { mode, toggle } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSignIn = () => {
    handleMenuClose();
    navigate('/signin');
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          px: { xs: 1.5, sm: 3, md: 6 },
          py: { xs: 1, sm: 1.25 }
        }}
      >
       
        <Box
          sx={{
            display: 'flex',
            // alignItems: 'center',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
              Task Manager
            </Typography>
            {/* small role label hidden on very small screens to keep header tidy */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}
            >
              ({user?.role || 'guest'})
            </Typography>
          </Box>

          {/* optional subtitle on larger screens */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }}
          >
            Manage your tasks — fast & simple
          </Typography>
        </Box>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={toggle}
              size="large"
              color="inherit"
              aria-label="toggle theme"
              title="Toggle theme"
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {user ? (
              <>
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  Hi, {user.name}
                </Typography>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', ml: 1 }}>
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </Avatar>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1, textTransform: 'none', px: 2 }}
                  onClick={() => { if (window.confirm('Are you willing to sign out?')) {
                    signOut();
                    navigate('/sigin')
                  } }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => navigate('/signin')} sx={{ textTransform: 'none' }}>
                Sign in
              </Button>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              aria-label="open menu"
              size="large"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => { toggle(); handleMenuClose(); }}>
                {mode === 'dark' ? <Brightness7Icon sx={{ mr: 1 }} /> : <Brightness4Icon sx={{ mr: 1 }} />}
                Toggle theme
              </MenuItem>

              <Divider />

              {user ? (
                <>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>
                    <Typography variant="body2">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="body2">Hi, {user.name}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {if (window.confirm('Are you willing to Sign Out?')) {
                       signOut();
                       navigate('/signin');
                        }}} sx={{ color: 'error.main' }}>
                    Sign out
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleSignIn}>
                  Sign in
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
