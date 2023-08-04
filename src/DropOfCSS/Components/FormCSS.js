const ContactLightCSS = `
  const styled = styled.div\`
  background-color: [BG HEX]26;
  color: [BG CONTRAST HEX];
  border: 2px solid [PRIMARY HEX];
  border-radius: 2px;
  width: 50vw;
  min-height: 45vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2rem 2rem 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;

  h1 {
    color: [BG CONTRAST HEX];
    grid-column: 1 / span 2;
    grid-row: 1;
    text-align: center;
    font-size: calc(12px + 0.5vw);
    margin-top: 4px;
    padding: 0;
  }

  h2 {
    color: [BG CONTRAST HEX];
    grid-column: 1 / span 2;
    grid-row: 2;
    text-align: center;
    font-size: calc(8px + 0.5vw);
    margin: 0;
    padding: 0;
  }

  form {
    width: 80%;
    grid-column: 1;
    grid-row: 3 / span 3;
    font-size: calc(8px + 0.5vw);
    padding: 1rem;
  }

  form > input {
    border-radius: 4px;
    border: 2px solid [PRIMARY HEX];
  }

  form > textarea {
    border-radius: 4px;
    border: 2px solid [PRIMARY HEX];
    height: 2rem;
    resize: vertical;
  }

  p {
    grid-column: 2;
    grid-row: 3 / span 3;
    font-size: calc(8px + 0.5vw);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
    margin-top: 0;
    padding-top: 0;
    word-wrap: break-word;
  }

  p > span {
    display: flex;
    align-items: center;
    margin-right: 5px;
    word-wrap: break-word;
  }

  #icon {
    padding: 1rem;
    font-size: calc(22px + 0.5vw);
    text-align: center;
    justify-content: center;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  \`;`;

const ContactDarkCSS = `
  const styled = styled.div\`
  background-color: [PRIMARY HEX];
  color: [PRIMARY CONTRAST HEX];
  border: 2px solid [PRIMARY HEX];
  border-radius: 2px;
  width: 50vw;
  min-height: 45vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2rem 2rem 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;

  h1 {
    color: [PRIMARY CONTRAST HEX];
    grid-column: 1 / span 2;
    grid-row: 1;
    text-align: center;
    font-size: calc(12px + 0.5vw);
    margin-top: 4px;
    padding: 0;
  }

  h2 {
    color: [BG CONTRAST HEX];
    grid-column: 1 / span 2;
    grid-row: 2;
    text-align: center;
    font-size: calc(8px + 0.5vw);
    margin: 0;
    padding: 0;
  }

  form {
    width: 80%;
    grid-column: 1;
    grid-row: 3 / span 3;
    font-size: calc(8px + 0.5vw);
    padding: 1rem;
  }

  form > input {
    border-radius: 4px;
    border: 2px solid [PRIMARY HEX];
  }

  form > textarea {
    border-radius: 4px;
    border: 2px solid [PRIMARY HEX];
    height: 2rem;
    resize: vertical;
  }

  p {
    grid-column: 2;
    grid-row: 3 / span 3;
    font-size: calc(8px + 0.5vw);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
    margin-top: 0;
    padding-top: 0;
    word-wrap: break-word;
  }

  p > span {
    display: flex;
    align-items: center;
    margin-right: 5px;
    word-wrap: break-word;
  }

  #icon {
    padding: 1rem;
    font-size: calc(22px + 0.5vw);
    text-align: center;
    justify-content: center;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  \`;`;

const LoginOauthCSS = `
  const styled = styled.div\`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  min-width: 40vw;
  max-width: 60vw;

  .login-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #000;
    padding: 20px;
    border-radius: 4px;
    border: 2px solid white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden; /* Prevent vertical overflow */
  }

  .login-container input[type="text"],
  .login-container input[type="password"] {
    width: 90%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid [TERTIARY HEX];
    border-radius: 4px;
  }

  .login-container input[type="text"]:focus,
  .login-container input[type="password"]:focus {
    border: 2px solid [SECONDARY HEX]];
    outline: none;
  }

  .login-container button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: [SECONDARY HEX]];
    color: [SECONDARY CONTRAST HEX];
    border: 2px solid [SECONDARY HEX]];
    border-radius: 4px;
    cursor: pointer;
  }

  .login-container button:hover {
    background-color: [TERTIARY HEX];
    color: [TERTIARY CONTRAST HEX];
    border: 2px solid [PRIMARY HEX];
  }

  .oauth-buttons {
    max-width: 500px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .google-btn {
    margin: 5px;
    width: 80%;
    min-width: 184px;
    max-width: 184px;
    height: 42px;
    background-color: #fcfcfc;
    border-radius: 2px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    transition: all 400ms ease 0s;
    display: flex;
  }

  .google-btn .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: white;
  }

  .google-btn .google-icon {
    position: absolute;
    width: 30px;
    height: 30px;
  }

  .google-btn .btn-text {
    margin: 14px 0 0 45px;
    color: #000;
    font-size: 13px;
    letter-spacing: 0.2px;
    font-family: "Roboto", sans-serif;
  }

  .google-btn:hover {
    box-shadow: 0 0 6px [PRIMARY HEX];
  }

  .google-btn:active {
    background: [PRIMARY HEX];
  }

  .fb-btn {
    margin: 5px;
    width: 80%;
    min-width: 184px;
    max-width: 184px;
    height: 42px;
    background-color: #3b5998;
    border-radius: 4px;
    color: white;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    transition: all 400ms ease 0s;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: "Roboto", sans-serif;
  }

  .fb-btn:hover {
    box-shadow: 0 0 6px [SECONDARY HEX]];
  }

  .fb-btn:active {
    background: [SECONDARY HEX]];
  }
  .google-icon-svg,
  .fb-icon-svg {
    max-width: 30px;
    max-height: 30px;
  }
  \`;`;

const GenericFormCSS = `
  const styled = styled.div\`
  font-size: calc(12px + 0.5vw);
  background-color: [PRIMARY HEX];
  color: [PRIMARY CONTRAST HEX];
  padding: 1rem;
  
  label {
    font-size: calc(12px + 0.5vw);
    color: white;
  }
  
  input {
    color: white;
    border-radius: 0.5rem;
    outline: none;
    padding: 0.5rem;
  }
  
  #checkboxes, #radios {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  
  button {
    font-size: calc(12px + 0.5vw)
    border: none;
    background-color: [BG HEX];
    color: [BG CONTRAST HEX];
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  
    &:hover {
      outline: 2px solid white;
      background-color: [BG HEX]40;
      color: [BG CONTRAST HEX];
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
  
  div > label {
    color: white;
  }
  
  div > input {
    color: black;
  }
  \`;`;

const CheckoutPaymentCSS = `
font-size: calc(10px + 1vw);

min-width: 40vw;
max-width: 60vw;
margin: 0 auto;
padding: 1rem;
background-color: [BG HEX];
color: [BG CONTRAST HEX];
border-radius: 4px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
font-family: Arial, sans-serif;

h1 {
  color: [PRIMARY HEX];

  text-align: center;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-size: calc(10px + 1vw);

    font-weight: bold;
  }

  input[type="text"] {
    padding: 0.5rem;
    border: 2px solid [SECONDARY HEX]];
    border-radius: 4px;
  }
}

.submit-button {
  display: block;
  margin: auto;

  width: 75%;
  padding: 12px;
  background-color: [TERTIARY HEX];
  color: [TERTIARY CONTRAST HEX];
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: [TERTIARY HEX];
  }
}
  \`;`;

const CheckoutAddressCSS = `
  const styled = styled.div\`
  font-size: calc(10px + 1vw);
  min-width: 40vw;
  max-width: 60vw;
  margin: 0 auto;
  padding: 1rem;
  background-color: [BG HEX];
  color: [BG CONTRAST HEX];
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;

  h1 {
    color: [PRIMARY HEX];
    text-align: center;
    margin-bottom: 20px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      font-weight: bold;
      font-size: calc(10px + 1vw);
    }

    input[type="text"],
    select {
      padding: 10px;
      border: 2px solid [SECONDARY HEX]];
      border-radius: 4px;
    }

    select {
      appearance: none;
      background-color: #fff;
    }
  }

  .submit-button {
    display: block;
    width: 75%;
    margin: auto;
    padding: 12px;
    background-color: [TERTIARY HEX];
    color: [TERTIARY CONTRAST HEX];
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #333;
      color: [TERTIARY HEX];
    }
  }
  \`;`;

export const formCSSFunc = (form) => {
  if (form.name === "Contact Us - Light") {
    return ContactLightCSS;
  } else if (form.name === "Contact Us - Dark") {
    return ContactDarkCSS;
  } else if (form.name === "Login - with OAuth") {
    return LoginOauthCSS;
  } else if (form.name === "Generic Form") {
    return GenericFormCSS;
  } else if (form.name === "Checkout - Payment") {
    return CheckoutPaymentCSS;
  } else if (form.name === "Checkout - Address") {
    return CheckoutAddressCSS;
  }
};
