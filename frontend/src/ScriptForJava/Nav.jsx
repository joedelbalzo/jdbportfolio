import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ShoppingCartSharp } from "@mui/icons-material";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { useNavigate, Link } from "react-router-dom";
import HomeJava from "../Home";

export default function Nav() {
  const scriptAuth = useSelector((state) => state.scriptAuth);
  const scriptCart = useSelector((state) => state.scriptCart);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  scriptAuth.adminStatus === true ? (pages = ["Home", "Menu", "Merch", "About", "Admin"]) : (pages = ["Home", "Menu", "Merch", "About"]);
  let settings = [];
  scriptAuth.id ? (settings = ["Account", "Cart", "Logout"]) : (settings = ["Account", "Cart", "Login"]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (page) => {
    navigate(`${page.toLowerCase()}`);
  };

  const getCartLength = () => {
    let sum = 0;
    // scriptCart.lineItems.forEach((product) => {
    //   sum += product.quantity;
    // });
    return sum;
  };

  return (
    <AppBar position="static" style={{ background: "#004C60" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EmojiFoodBeverageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/scriptforjava/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Script for Java
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateTo(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* THIS IS THE SMALL ONE */}
          <Link to={"/scriptforjava/home"} element={<HomeJava />} style={{ color: "white" }}>
            <EmojiFoodBeverageIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </Link>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href="/scriptforjava/"
            sx={{
              mr: -5,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Script for Java
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page} onClick={() => navigateTo(page)} sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "white",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            {scriptAuth.id ? (
              // (
              //   <a
              //     href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`}
              //     style={{ color: "white", textDecoration: "none" }}
              //   >
              //     Github Login
              //   </a>
              // ) :
              <Link to="/scriptforjava/logout" style={{ color: "white", textDecoration: "none" }}>
                Logout
              </Link>
            ) : (
              ""
            )}
          </Typography>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 400,
              letterSpacing: ".05rem",
              color: "white",
              textDecoration: "none",
              justifyContent: "center",
            }}
          >
            {/* {!auth.id ? (<a href={`https://github.com/login/oauth/authorize?client_id=${window.client_id}`} style={{color: 'white', textDecoration: 'none'  }}>Github Login</a>):''} */}
          </Typography>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={getCartLength()} color="error">
              <Link to="/scriptforjava/cart">
                <ShoppingCartSharp sx={{ pr: 1, color: "white" }} />
              </Link>
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt={`${scriptAuth.username}`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => navigateTo(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
