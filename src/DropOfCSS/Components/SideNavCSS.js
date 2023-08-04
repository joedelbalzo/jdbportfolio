const SideNavCSS = `
  const styled = styled.div\`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 130px;
  justify-self: center;
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  min-height: 70vh;
  overflow: auto;
  border: 2px solid [PRIMARY HEX];
  font-size: calc(10px + 0.5vw);
  \`;`;

const SideNav2CSS = `
const styled = styled.div\`

@media screen and (max-width: 900px) {
  display: none;
}
width: 130px;
justify-self: center;
margin: 0;
padding: 0;

background-color: [BG HEX];
color: [BG CONTRAST HEX];
min-height: 70vh;
overflow: auto;
border: 2px solid [PRIMARY HEX];

a {
  font-size: calc(10px + 0.5vw);

  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: [SECONDARY HEX];
    color: [SECONDARY CONTRAST HEX];
  }
}
  \`;`;

const SideNav3CSS = `
  const styled = styled.div\`
  @media screen and (max-width: 900px) {
    display: none;
  }
  width: 130px;
  justify-self: center;
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  height: 100%;
  overflow: auto;
  border-right: 2px solid [PRIMARY HEX];
  padding-top: 20px;

  a {
    font-size: calc(10px + 0.5vw);

    display: block;
    color: [SECONDARY HEX];
    border-bottom: 2px solid [BG HEX];
    padding: 0.3rem 0.7rem;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: [TERTIARY HEX];
      color: [TERTIARY CONTRAST HEX];
      border-bottom: 2px solid [SECONDARY HEX];
    }
  }
  \`;`;

const DropdownSideCSS = `
  const styled = styled.div\`
  @media screen and (max-width: 900px) {
    display: none;
  }
  width: 130px;
  justify-self: center;
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  height: 70vh;
  overflow: auto;
  border-right: 2px solid [PRIMARY HEX];
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: calc(10px + 0.5vw);
  position: relative;

  a {
    display: block;
    color: [BG CONTRAST HEX];
    padding: 10px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      background-color: [PRIMARY HEX];
      color: [PRIMARY CONTRAST HEX];
    }

    &.active {
      background-color: [SECONDARY HEX];
      color: [SECONDARY CONTRAST HEX];
    }

    &.has-dropdown::after {
      content: " ▼";
      margin-left: 5px;
    }

    &.has-dropdown:hover::after {
      color: [TERTIARY HEX];
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    margin-bottom: 50px;
    width: 147px;
    background-color: [BG HEX];
    color: [BG CONTRAST HEX];
    border: 2px solid [PRIMARY HEX];
    z-index: 1;

    a {
      display: block;
      padding: 8px 16px;
      color: black;
      text-decoration: none;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: [SECONDARY HEX];
        color: [SECONDARY CONTRAST HEX];
      }
    }
  }

  &:hover .dropdown-content {
    display: block;
  }
  \`;`;

export const sideNavCSSFunc = (sideNav) => {
  if (sideNav.name === "Title & Subtitle") {
    return SideNavCSS;
  } else if (sideNav.name === "Text Shadow") {
    return SideNav2CSS;
  } else if (sideNav.name === "Uppercase") {
    return SideNav3CSS;
  } else if (sideNav.name === "Underline") {
    return DropdownSideCSS;
  }
};
