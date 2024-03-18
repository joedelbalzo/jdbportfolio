const SimpleNavBar = `
const SimpleNavBar = styled.div\`
background-color: inherit;
font-size: calc(10px + 0.5vw);
padding: 10px;
text-align: center;
@media screen and (max-width: 768px) {
  font-size: calc(12px + 1vw);
}
a {
text-decoration: none;
color: [PRIMARY HEX];
padding: 8px;
}
a:hover{
border-bottom: 2px solid [TERTIARY HEX];
border-radius: .5rem;
}
a:active {
  color: [SECONDARY HEX]

}
  }
  \`;`;

const DropdownNav = `
  const DropdownNav = styled.div\`

  display: flex;
  width: 100%;
  align-items: center;
  font-size: calc(12px + 0.5vw);
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  background-color: [PRIMARY HEX];
  color: [PRIMARY CONTRAST HEX];
  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  .drop-li {
    float: left;
    position: relative;
    @media screen and (max-width: 768px) {
      float: center;
      flex-grow: 1;
      font-size: calc(12px + 1vw);
    }

    a,
    .dropbtn {
      display: inline-block;
      color: [PRIMARY CONTRAST HEX];
      text-align: center;
      padding: 16px;
      text-decoration: none;
    }

    a:hover,
    .dropdown:hover .dropbtn {
      background-color: [BG HEX];
      color: [BG CONTRAST HEX];
    }
    a:hover {
      background-color: [SECONDARY HEX];
      color: [BG CONTRAST HEX];
    }

    .dropdown {
      display: inline-block;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      z-index: 1;
      background-color: [SECONDARY HEX];
      color: [SECONDARY CONTRAST HEX];
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

      a {
        color: [SECONDARY CONTRAST HEX];
        padding: 12px 12px;
        text-decoration: none;
        display: block;
        text-align: left;
      }

      a:hover {
        background-color: [PRIMARY HEX];
        color: [PRIMARY CONTRAST HEX];
      }
    }

    &:hover .dropdown-content {
      display: block;
      color: [PRIMARY HEX];
    }
  }
  \`;`;

const GradientBackgroundNav = `
  const GradientBackgroundNav = styled.div\`
background: linear-gradient(to right, [BG HEX], [SECONDARY HEX]);
color: [SECONDARY CONTRAST HEX];
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
color: [SECONDARY CONTRAST HEX];
padding: 1rem;
}
a:hover{
  background: [SECONDARY HEX]40;
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(100, 100, 100, 0.2);
  backdrop-filter: blur(21.4px);
  -webkit-backdrop-filter: blur(2.4px);
  outline: 1px solid rgba(255, 255, 255, 1); 
}
  \`;`;

const BorderBottomNav = `
  const BorderBottomNav = styled.div\`
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  padding: 10px;
  display: flex;
  justify-content: space-evenly;
  font-size: calc(10px + 0.5vw);
  border-bottom: 4px solid [SECONDARY HEX];
  @media screen and (max-width: 768px) {
    font-size: calc(12px + 1vw);
  }

  a {
    text-decoration: none;
    color: [PRIMARY HEX];
    padding: 8px;
  }
  a:hover {
    color: white;
  }
  \`;`;

const BorderBottomNavWithLogin = `
  const BorderBottomNavWithLogin = styled.div\`
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;

  flex: 1;
  font-size: calc(10px + 1vw);
  border-bottom: 4px solid [SECONDARY HEX];
  @media screen and (max-width: 768px) {
    font-size: calc(10px + 1vw);
  }

  a {
    text-decoration: none;
    color: [PRIMARY HEX];
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
  \`;`;

export const navCSSFunc = (nav) => {
  if (nav.name === "Simple") {
    return SimpleNavBar;
  } else if (nav.name === "Dropdown") {
    return DropdownNav;
  } else if (nav.name === "Gradient Background") {
    return GradientBackgroundNav;
  } else if (nav.name === "Border Bottom") {
    return BorderBottomNav;
  } else if (nav.name === "Border with Login") {
    return BorderBottomNavWithLogin;
  }
};
