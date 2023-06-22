import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import DrinksCoffees from "./DrinksCoffees";
import DrinksTeas from "./DrinksTeas";
import DrinksSmoothies from "./DrinksSmoothies";
import Merch from "../MerchComponents/Merch";
import DrinkProducts from "./DrinkProducts";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function SubNavDrinks() {
  const { scriptAuth, scriptCart } = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  scriptAuth.adminStatus === true
    ? (pages = ["Home", "Menu", "Merch", "About", "Admin"])
    : (pages = ["Home", "Menu", "Merch", "About"]);
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
  return (
    <div id="scriptforjava-subnav">
      <AppBar position="static" style={{ background: "#029987" }}>
        <Container
          sx={{
            maxWidth: "xl",
          }}
        >
          <Toolbar disableGutters>
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

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/"
                element={<DrinkProducts />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                All Drinks
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/coffee"
                element={<DrinksCoffees />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Coffee
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/tea"
                element={<DrinksTeas />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Tea
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/smoothies"
                element={<DrinksSmoothies />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Smoothies
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/"
                element={<DrinkProducts />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                All Drinks
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/coffee"
                element={<DrinksCoffees />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Coffee
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/tea"
                element={<DrinksTeas />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Tea
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/smoothies"
                element={<DrinksSmoothies />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Smoothies
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SubNavDrinks;
