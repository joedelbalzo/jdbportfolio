import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MerchHats from "./MerchHats";
import MerchMugs from "./MerchMugs";
import MerchShirts from "./MerchShirts";
import { Link } from "react-router-dom";

function SubNavMerch() {
  const { scriptAuth, scriptCart } = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  let pages = [];
  scriptAuth.adminStatus === true
    ? (pages = ["All Merch", "Hats", "Tea", "Smoothies"])
    : (pages = ["All Merch", "Hats", "Tea", "Smoothies"]);
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
      navigate(`../menu`);
    } else navigate(`../menu/${page.toLowerCase()}`);
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
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
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
                to="../merch/shirts"
                element={<MerchShirts />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shirts
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
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../merch/hats"
                element={<MerchHats />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Hats
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
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../merch/mugs"
                element={<MerchMugs />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Mugs
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
                to="../merch/shirts"
                element={<MerchShirts />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Shirts
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
                to="../merch/hats"
                element={<MerchHats />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Hats
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
                to="../merch/mugs"
                element={<MerchMugs />}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Mugs
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SubNavMerch;
