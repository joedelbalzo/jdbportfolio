import { useSelector } from "react-redux";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ShoppingCartSharp } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const menuItems = [
  { label: "Home", href: "/scriptforjava/home" },
  { label: "Login", href: "/scriptforjava/login", display: { xs: "none", sm: "flex" } },
  {
    label: "Github Login",
    href: `https://github.com/login/oauth/authorize?client_id=${window.client_id}`,
    display: { xs: "none", sm: "flex" },
  },
  { label: "Github Logout", href: "/scriptforjava/logout", display: { xs: "none", sm: "flex" } },
  { label: "About", href: "/scriptforjava/about", display: { xs: "none", sm: "flex" } },
  { label: "Account", href: "/scriptforjava/account", display: { xs: "none", sm: "flex" } },
  { label: "Contact", href: "/scriptforjava/about/contact", display: { xs: "none", sm: "flex" } },
  { label: "Careers", href: "/scriptforjava/about/careers", display: { xs: "none", sm: "flex" } },
  {
    label: "Locations",
    href: "/scriptforjava/about/locations",
    display: { xs: "none", sm: "flex" },
  },
  { label: "Drinks", href: "/scriptforjava/drinks", display: { xs: "none", sm: "flex" } },
  { label: "Merch", href: "/scriptforjava/merch", display: { xs: "none", sm: "flex" } },
];

const getCartLength = (cart) => {
  let sum = 0;
  // cart.lineItems.forEach((product) => {
  //   sum += product.quantity;
  // });
  return sum;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function FooterNav() {
  const { auth, cart } = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { filterString } = useParams();
  const filter = filterString ? JSON.parse(filterString) : {};
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const search = (ev) => {
    ev.preventDefault();
    const _filter = { ...filter };
    if (ev.target.name === "name") {
      if (ev.target.value) {
        _filter.name = ev.target.value;
      } else {
        delete _filter.name;
      }
    }
    navigate(`/drinks/search/${JSON.stringify(_filter)}`);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
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

  return (
    <Box sx={{ flexGrow: 10, maxHeight: 1000 }}>
      <ScrollToTop />
      <AppBar position="static" style={{ background: "#004C60" }}>
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              textDecoration: "none",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginRight: 100,
            }}
          >
            {menuItems.slice(0, 6).map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.href}
                variant="subtitle2"
                sx={{ textDecoration: "none", marginRight: 0.5, color: "white", ...item.display }}
              >
                {item.label}
              </Typography>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              textDecoration: "none",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            {menuItems.slice(6, 9).map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.href}
                variant="subtitle2"
                sx={{ textDecoration: "none", marginRight: 0.5, color: "white", ...item.display }}
              >
                {item.label}
              </Typography>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              textDecoration: "none",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 100,
            }}
          >
            {menuItems.slice(9, 11).map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.href}
                variant="subtitle2"
                sx={{ textDecoration: "none", marginRight: 0.5, color: "white", ...item.display }}
              >
                {item.label}
              </Typography>
            ))}
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large" color="inherit">
            <Badge badgeContent={getCartLength(cart)} color="error">
              <Link to="/scriptforjava/cart">
                <ShoppingCartSharp sx={{ pr: 1, color: "white" }} />
              </Link>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
