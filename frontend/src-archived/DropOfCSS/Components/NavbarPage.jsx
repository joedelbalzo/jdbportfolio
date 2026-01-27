import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reactElementToJSXString from "react-element-to-jsx-string";
//make this navcss func
import { navCSSFunc } from "./NavCSS";
import { download } from "./Download";
import { cssCreateCodeFile } from "../../store";

const SimpleNavBar = styled.div`
background-color: ${(props) => props.bg};
font-size: calc(10px + 0.5vw);
padding: 10px;
text-align: center;
@media screen and (max-width: 768px) {
  font-size: calc(12px + 1vw);
}
a {
text-decoration: none;
color: ${(props) => props.primary};
padding: 8px;
}
a:hover{
border-bottom: 2px solid ${(props) => props.tertiary};
border-radius: .5rem;
}
a:active {
  color: ${(props) => props.secondary}

}
  }
`;

const DropdownNav = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  font-size: calc(12px + 0.5vw);
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.primary};
  color: ${(props) => props.primaryColorContrast};
  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  .drop-li {
    float: left;
    position: relative; // Add this line
    @media screen and (max-width: 768px) {
      float: center;
      flex-grow: 1;
      font-size: calc(12px + 1vw);
    }

    a,
    .dropbtn {
      display: inline-block;
      color: ${(props) => props.primaryColorContrast};
      text-align: center;
      padding: 16px;
      text-decoration: none;
    }

    a:hover,
    .dropdown:hover .dropbtn {
      background-color: ${(props) => props.bgColor};
      color: ${(props) => props.bgColorContrast};
    }
    a:hover {
      background-color: ${(props) => props.secondary};
      color: ${(props) => props.bgColorContrast};
    }

    .dropdown {
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      z-index: 1;
      background-color: ${(props) => props.secondary};
      color: ${(props) => props.secondaryColorContrast};
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

      a {
        color: ${(props) => props.secondaryColorContrast};
        padding: 12px 12px;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      a:hover {
        background-color: ${(props) => props.primary};
        color: ${(props) => props.primaryColorContrast};
      }
    }

    &:hover .dropdown-content {
      display: block;
      color: ${(props) => props.primary};
    }
  }
`;
const GradientBackgroundNav = styled.div`
background: linear-gradient(to right, ${(props) => props.bg}, ${(props) => props.secondary});
color: ${(props) => props.secondaryColorContrast};
padding: 1px;
display: flex;
justify-content: center;
@media screen and (max-width: 768px) {
  font-size: calc(10px + 1vw);
}
}

a {
  font-size: calc(10px + 1vw);

text-decoration: none;
color: ${(props) => props.secondaryColorContrast};
padding: 1rem;
}
a:hover{
  background: ${(props) => props.secondary}40;
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(100, 100, 100, 0.2);
  backdrop-filter: blur(21.4px);
  -webkit-backdrop-filter: blur(2.4px);
  outline: 1px solid rgba(255, 255, 255, 1); 
}
`;

const BorderBottomNav = styled.div`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.bgColorContrast};
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  font-size: calc(10px + 0.5vw);
  border-bottom: 4px solid ${(props) => props.secondary};
  @media screen and (max-width: 768px) {
    font-size: calc(12px + 1vw);
  }

  a {
    text-decoration: none;
    color: ${(props) => props.primary};
    padding: 8px;
  }
  a:hover {
    color: white;
  }
`;
const BorderBottomNavWithLogin = styled.div`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.bgColorContrast};
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;

  flex: 1;
  font-size: calc(10px + 1vw);
  border-bottom: 4px solid ${(props) => props.secondary};
  @media screen and (max-width: 768px) {
    font-size: calc(10px + 1vw);
  }

  a {
    text-decoration: none;
    color: ${(props) => props.primary};
    padding: 8px;
  }
  a:hover {
    color: white;
  }
  .login-large {
    padding: 10px;
    align-items: center;
    margin-left: auto;
    font-size: calc(10px + 1vw);
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .login-small {
    display: none;
    padding: 10px;
    align-items: center;
    margin-left: auto;
    @media screen and (max-width: 768px) {
      font-size: calc(10px + 1vw);
      display: inline;
    }
  }
`;

const NavbarPage = ({ nav }) => {
  const { cssAuth, cssCpg } = useSelector((state) => state);
  const [forceRerender, setForceRerender] = useState(0);
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [primaryColorContrast, setPrimaryColorContrast] = useState("");
  const [secondaryColorContrast, setSecondaryColorContrast] = useState("");
  const [tertiaryColorContrast, setTertiaryColorContrast] = useState("");
  const [bgColorContrast, setBgColorContrast] = useState("");
  const [error, setError] = useState("");
  const [navbarPage, setNavbarPage] = useState("");
  const [jsxString, setJsxString] = useState("");
  const [downloadableCSS, setDownloadableCSS] = useState("");
  const [dl, setDl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");

  if (!cssCpg) {
    return null;
  }
  if (nav) {
    // console.log("nav:", nav.name);
  } else {
    return null;
  }

  useEffect(() => {
    try {
      let savedColors = JSON.parse(localStorage.getItem("colors"));
      if (cssCpg) {
        setColorsFromRedux();
        localStorage.setItem("colors", JSON.stringify(cssCpg));
      } else {
        localStorage.setItem("colors", JSON.stringify(cssCpg));
        setPrimaryColor(savedColors[0].hex.value);
        setSecondaryColor(savedColors[1].hex.value);
        setTertiaryColor(savedColors[2].hex.value);
        setBgColor(savedColors[3].hex.value);
        setPrimaryColorContrast(savedColors[0].contrast.value);
        setSecondaryColorContrast(savedColors[1].contrast.value);
        setTertiaryColorContrast(savedColors[2].contrast.value);
        setBgColorContrast(savedColors[3].contrast.value);
      }
      setForceRerender((prev) => prev + 1);
    } catch (err) {
      console.error("Error reading colors from localStorage", err);
    }
  }, [cssCpg]);

  const setColorsFromRedux = () => {
    setPrimaryColor(cssCpg[0].hex.value);
    setSecondaryColor(cssCpg[1].hex.value);
    setTertiaryColor(cssCpg[2].hex.value);
    setBgColor(cssCpg[3].hex.value);
    setPrimaryColorContrast(cssCpg[0].contrast.value);
    setSecondaryColorContrast(cssCpg[1].contrast.value);
    setTertiaryColorContrast(cssCpg[2].contrast.value);
    setBgColorContrast(cssCpg[3].contrast.value);
  };

  useEffect(() => {
    setNavbarPage(navFunc(nav));
    setDownloadableCSS(navCSSFunc(nav));
  }, [nav, primaryColor, secondaryColor, tertiaryColor, bgColor]);

  useEffect(() => {
    try {
      setJsxString(reactElementToJSXString(navbarPage, { indent: 2 }));
    } catch (err) {
      console.log();
    }
  }, [navbarPage]);

  useEffect(() => {
    setJsxString(jsxString.replaceAll("styled", tagName));
  }, [jsxString]);

  useEffect(() => {
    try {
      const result = download(jsxString, downloadableCSS, nav);
      setDl(result);
    } catch (err) {
      console.log();
    }
  }, [jsxString]);

  useEffect(() => {
    try {
      dispatch(cssCreateCodeFile(dl, nav.type));
    } catch (err) {
      console.log();
    }
  }, [dl]);

  const navFunc = (nav) => {
    if (nav.name === "Simple") {
      setTagName("SimpleNavBar");

      return (
        <SimpleNavBar
          key={`${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`}
          primary={primaryColor}
          primaryColorContrast={primaryColorContrast}
          secondary={secondaryColor}
          secondaryColorContrast={secondaryColorContrast}
          tertiary={tertiaryColor}
          bg={bgColor}
          bgColorContrast={bgColorContrast}
        >
          <a href="/#/dropofcss">Home</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Services</a>
          <a href="/#/dropofcss">Contact</a>
        </SimpleNavBar>
      );
    } else if (nav.name === "Dropdown") {
      setTagName("DropdownNav");

      return (
        <DropdownNav
          key={`drop-${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`}
          primary={primaryColor}
          primaryColorContrast={primaryColorContrast}
          secondary={secondaryColor}
          secondaryColorContrast={secondaryColorContrast}
          tertiary={tertiaryColor}
          bg={bgColor}
          bgColorContrast={bgColorContrast}
        >
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            <li className="drop-li">
              <a href="/#/dropofcss">Home</a>
            </li>
            <li className="drop-li">
              <a href="/#/dropofcss">News</a>
            </li>
            <li className="dropdown drop-li">
              <a className="dropbtn" href="/#/dropofcss">
                Dropdown
              </a>
              <div className="dropdown-content">
                <a href="/#/dropofcss">Link 1</a>
                <a href="/#/dropofcss">Link 2</a>
                <a href="/#/dropofcss">Link 3</a>
              </div>
            </li>{" "}
          </ul>
        </DropdownNav>
      );
    } else if (nav.name === "Gradient Background") {
      setTagName("GradientBackgroundNav");

      return (
        <GradientBackgroundNav
          key={`grad-${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`}
          primary={primaryColor}
          primaryColorContrast={primaryColorContrast}
          secondary={secondaryColor}
          secondaryColorContrast={secondaryColorContrast}
          tertiary={tertiaryColor}
          bg={bgColor}
          bgColorContrast={bgColorContrast}
        >
          <a href="/#/dropofcss">Home</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Services</a>
          <a href="/#/dropofcss">Contact</a>
        </GradientBackgroundNav>
      );
    } else if (nav.name === "Border Bottom") {
      setTagName("BorderBottomNav");

      return (
        <BorderBottomNav
          key={`border-${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`}
          primary={primaryColor}
          primaryColorContrast={primaryColorContrast}
          secondary={secondaryColor}
          secondaryColorContrast={secondaryColorContrast}
          tertiary={tertiaryColor}
          bg={bgColor}
          bgColorContrast={bgColorContrast}
        >
          <a href="/#/dropofcss">Home</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Services</a>
          <a href="/#/dropofcss">Contact</a>{" "}
        </BorderBottomNav>
      );
    } else if (nav.name === "Border with Login") {
      console.log(nav.name);
      console.log(`border-with-login-${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`);
      return (
        <BorderBottomNavWithLogin
          key={`border-with-login-${primaryColor}-${secondaryColor}-${bgColor}-${forceRerender}`}
          primary={primaryColor}
          primaryColorContrast={primaryColorContrast}
          secondary={secondaryColor}
          secondaryColorContrast={secondaryColorContrast}
          tertiary={tertiaryColor}
          bg={bgColor}
          bgColorContrast={bgColorContrast}
        >
          <a href="/#/dropofcss">Home</a>
          <a href="/#/dropofcss">About</a>
          <a href="/#/dropofcss">Services</a>
          <a href="/#/dropofcss">Contact</a>
          <div className="login-large">
            <a href="/#/dropofcss">Login</a>
          </div>
          <div className="login-small">///</div>
        </BorderBottomNavWithLogin>
      );
    }
  };

  return <div style={{ height: "100%", width: "100%", display: "unset", margin: "auto" }}>{navbarPage}</div>;
};

export default NavbarPage;
