// react imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// mui imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//store imports
import { placesLogout } from "../store/index";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HomeNav() {
  const { placesAuth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  console.log(isMobile);

  let pages = [];

  placesAuth.id
    ? (pages = ["Home", "Settings", "Favorites", "About", "Logout"])
    : (pages = ["Login", "Home", "About"]);

  placesAuth.isAdmin === true ? pages.unshift("Admin") : "";

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTo = (page) => {
    if (!page) {
      navigate(`/`);
    }
    navigate(`/openplaces/${page.toLowerCase()}`);
  };

  const _logout = () => {
    dispatch(placesLogout());
    navigate("/openplaces");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{
          height: "7rem",
          justifyContent: "center",
          backgroundColor: "#003b21",
        }}
      >
        <Toolbar sx={{}}>
          <Box sx={{}}>
            <Tooltip title="Open Pages">
              <IconButton
                onClick={handleOpenUserMenu}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                // sx={{ width: "100px" }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: isMobile ? "10%" : "7%" }}
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
              onClick={handleCloseUserMenu}
            >
              {pages.map((page) =>
                page !== "Logout" ? (
                  <MenuItem key={page} onClick={() => navigateTo(page)}>
                    <Typography textAlign="center" marginLeft="4px" fontSize="calc(10px + 1vw)">
                      {page}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} onClick={() => _logout()}>
                    <Typography textAlign="center" marginLeft="4px" fontSize="calc(10px + 1vw)">
                      {page}
                    </Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          <Typography
            variant="h4"
            component="div"
            onClick={() => navigateTo("/")}
            sx={{
              margin: "auto",
              flexGrow: 1,
              wordWrap: "normal",
              fontSize: "calc(16px + 1.5vw)",
              ":hover": { cursor: "pointer" },
              maxWidth: "calc(100% - 100px)",
              textAlign: "center",
            }}
          >
            Open Places
          </Typography>

          {placesAuth.id ? (
            <Button
              color="inherit"
              sx={{
                fontSize: "calc(10px + 1vw)",
                // mr: "10px",
                width: "40px",
                textTransform: "capitalize",
                justifyContent: "right",
              }}
              onClick={() => _logout()}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{
                fontSize: "calc(10px + 1vw)",
                width: "fit-content",
                textTransform: "capitalize",
                justifyContent: "right",
              }}
              onClick={() => navigateTo("Login")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
