import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import DrinkProducts from "../DrinkComponents/DrinkProducts";

function SubNavHome() {
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
                flexWrap: "wrap",
                wordWrap: "normal",
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: "0",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/"
                element={<DrinkProducts />}
                style={{ textDecoration: "none", color: "inherit", fontSize: "calc(12px + 1.5vw)" }}
              >
                Spend a lot? Free shipping!
              </Link>
            </Typography>

            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                flexWrap: "wrap",
                wordWrap: "normal",
                fontFamily: "monospace",
                fontWeight: 400,
                letterSpacing: "0",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <Link
                to="../menu/"
                element={<DrinkProducts />}
                style={{ textDecoration: "none", color: "inherit", fontSize: "calc(8px + 1vw)" }}
              >
                Free shipping on orders $50 or more! An additional 10% off for any order over $100!
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SubNavHome;
