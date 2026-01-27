import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import About from "./About";
import AboutLocations from "./AboutLocations";
import AboutCareers from "./AboutCareers";
import AboutContact from "./AboutContact";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function SubNavAbout() {
  const { scriptAuth, scriptCart } = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  scriptAuth.adminStatus === true
    ? (pages = ["Careers", "Contact", "Locations"])
    : (pages = ["Careers", "Contact", "Locations"]);
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
    if (page === "All Drinks") {
      navigate(`../about`);
    } else navigate(`../about/${page.toLowerCase()}`);
  };
  return (
    <div id="scriptforjava-subnav">
      <AppBar position="static" style={{ background: "#029987" }}>
        <Container
          sx={{
            maxWidth: "xl",
            alignItems: "center",
          }}
        >
          <Toolbar disableGutters={true}>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  width: "50px",
                  left: 0,
                  marginRight: "auto",
                }}
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
                mx: "auto",
                ml: "-50px",
                display: { xs: "center", md: "none" },
                flex: 1,
                textAlign: "center",
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../about/"
                element={<About />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
                display: { xs: "none", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../about/locations"
                element={<AboutLocations />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Locations
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
                display: { xs: "none", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../about/contact"
                element={<AboutContact />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
                display: { xs: "none", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../about/careers"
                element={<AboutCareers />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Careers
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
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
                to="../about/"
                element={<About />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
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
                to="../about/locations"
                element={<AboutLocations />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Locations
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
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
                to="../about/contact"
                element={<AboutContact />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                component: "a",
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
                to="../about/careers"
                element={<AboutCareers />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Careers
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SubNavAbout;
