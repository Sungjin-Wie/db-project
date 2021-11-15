import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../lib/actions';
import {
  AppBar, 
  Box,
  Button, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  MenuItem, 
  Menu
} from '@mui/material';
import { 
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon
} from "@mui/icons-material";


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { isLoggedIn, name } = user;
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar variant="dense" >
          <Button variant="text" onClick={() => navigate('/')}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="white"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              DB 온라인
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button variant="text" onClick={() => navigate('/play')}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                게임 시작
              </Typography>
            </Button>
            <Button variant="text" onClick={() => navigate('/ranking')}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                랭킹
              </Typography>
            </Button>
            {isLoggedIn ? (
            <Button variant="text" disabled onClick={() => {}}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="white"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {name}님, 환영합니다.
              </Typography>
            </Button>) : <></>}
            {isLoggedIn ? (
              <Button variant="text" onClick={() => handleLogout()}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="white"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  로그아웃
                </Typography>
              </Button>
              ) : (
              <Button variant="text" onClick={() => navigate('/signin')}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="white"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  로그인
                </Typography>
              </Button>)}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* <pre onClick={() => console.log(user)}>{JSON.stringify(user, null, 2)}</pre> */}
    </Box>
  );
}
