import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContactUsLight = styled.div`
  background-color: ${(props) => props.colors.bg}26;
  color: ${(props) => props.colors.bgColorContrast};
  border: 2px solid ${(props) => props.colors.primary};
  border-radius: 2px;
  width: 50vw;
  min-height: 45vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2rem 2rem 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;

  h1 {
    color: ${(props) => props.colors.bgColorContrast};
    grid-column: 1 / span 2;
    grid-row: 1;
    text-align: center;
    font-size: calc(12px + 0.5vw);
    margin-top: 4px;
    padding: 0;
  }

  h2 {
    color: ${(props) => props.colors.bgColorContrast};
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
    border: 2px solid ${(props) => props.colors.primary};
  }

  form > textarea {
    border-radius: 4px;
    border: 2px solid ${(props) => props.colors.primary};
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
`;

const ContactUsDark = styled(ContactUsLight)`
  background-color: ${(props) => props.colors.primary};
  color: ${(props) => props.colors.primaryColorContrast};
  h1 {
    color: ${(props) => props.colors.primaryColorContrast};
  }
`;

const OauthLogin = styled.div`
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
    border: 1px solid ${(props) => props.colors.tertiary};
    border-radius: 4px;
  }

  .login-container input[type="text"]:focus,
  .login-container input[type="password"]:focus {
    border: 2px solid ${(props) => props.colors.secondary};
    outline: none;
  }

  .login-container button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${(props) => props.colors.secondary};
    color: ${(props) => props.colors.secondaryColorContrast};
    border: 2px solid ${(props) => props.colors.secondary};
    border-radius: 4px;
    cursor: pointer;
  }

  .login-container button:hover {
    background-color: ${(props) => props.colors.tertiary};
    color: ${(props) => props.colors.tertiaryColorContrast};
    border: 2px solid ${(props) => props.colors.primary};
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
    box-shadow: 0 0 6px ${(props) => props.colors.primary};
  }

  .google-btn:active {
    background: ${(props) => props.colors.primary};
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
    box-shadow: 0 0 6px ${(props) => props.colors.secondary};
  }

  .fb-btn:active {
    background: ${(props) => props.colors.secondary};
  }
  .google-icon-svg,
  .fb-icon-svg {
    max-width: 30px;
    max-height: 30px;
  }
`;

const GenericForm = styled.div`  font-size: calc(12px + 0.5vw);
background-color: ${(props) => props.colors.primary};
color: ${(props) => props.colors.primaryColorContrast};
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
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;

  &:hover {
    outline: 2px solid white;
    background-color: ${(props) => props.colors.bgColor40};
    color: ${(props) => props.colors.bgColorContrast};
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
`;
const PaymentForm = styled.div`
  font-size: calc(10px + 1vw);

  min-width: 40vw;
  max-width: 60vw;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;

  h1 {
    color: ${(props) => props.colors.primary};

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
      border: 2px solid ${(props) => props.colors.secondary};
      border-radius: 4px;
    }
  }

  .submit-button {
    display: block;
    margin: auto;

    width: 75%;
    padding: 12px;
    background-color: ${(props) => props.colors.tertiary};
    color: ${(props) => props.colors.tertiaryColorContrast};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #333;
      color: ${(props) => props.colors.tertiary};
    }
  }
`;
const AddressForm = styled.div`
  font-size: calc(10px + 1vw);
  min-width: 40vw;
  max-width: 60vw;
  margin: 0 auto;
  padding: 1rem;
  background-color: ${(props) => props.colors.bg};
  color: ${(props) => props.colors.bgColorContrast};
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;

  h1 {
    color: ${(props) => props.colors.primary};
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
      border: 2px solid ${(props) => props.colors.secondary};
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
    background-color: ${(props) => props.colors.tertiary};
    color: ${(props) => props.colors.tertiaryColorContrast};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #333;
      color: ${(props) => props.colors.tertiary};
    }
  }
`;

const FormPage = ({ form }) => {
  const { cssAuth, cssCpg } = useSelector((state) => state);

  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [tertiaryColor, setTertiaryColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [primaryColorContrast, setPrimaryColorContrast] = useState("");
  const [secondaryColorContrast, setSecondaryColorContrast] = useState("");
  const [tertiaryColorContrast, setTertiaryColorContrast] = useState("");
  const [bgColorContrast, setBgColorContrast] = useState("");
  const [error, setError] = useState("");
  const [formPage, setFormPage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!cssCpg) {
    return null;
  }
  if (form) {
    // console.log("form:", form.name);
  } else {
    return null;
  }

  useEffect(() => {
    try {
      console.log(cssCpg);
      setPrimaryColor(cssCpg[0].hex.value);
      setSecondaryColor(cssCpg[1].hex.value);
      setTertiaryColor(cssCpg[2].hex.value);
      setBgColor(cssCpg[3].hex.value);
      setPrimaryColorContrast(cssCpg[0].contrast.value);
      setSecondaryColorContrast(cssCpg[1].contrast.value);
      setTertiaryColorContrast(cssCpg[2].contrast.value);
      setBgColorContrast(cssCpg[3].contrast.value);
    } catch (err) {
      setError(err);
    }
  }, [cssCpg]);

  useEffect(() => {
    setFormPage(formFunc(form));
  }, [form]);

  const formFunc = (form) => {
    console.log(form.name);
    if (form.name === "Contact Us - Light") {
      return (
        <ContactUsLight
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            tertiaryColorContrast: tertiaryColorContrast,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <h1>contact us!</h1>
          <h2>we'd love to hear from you</h2>

          <form>
            <input placeholder="Name" />
            <input placeholder="Email Address" />
            <input placeholder="Phone Number" />
            <textarea placeholder="Message"></textarea>
            <div>
              <label>
                How should we contact you?
                <input type="checkbox" />
                <label>Phone</label>
                <input type="checkbox" />
                <label>Email</label>
              </label>
            </div>
            <div>
              <input type="radio" />
              <label>Agree to be contacted?</label>
            </div>
          </form>
          <p>
            <span id="icon">&#128382;</span>
            <span>phone</span>
            <span>(917) 867-5309</span>
            <span id="icon">&#x2709;</span>
            <span>email</span>
            <span>peter@peter.com</span>
          </p>
        </ContactUsLight>
      );
    } else if (form.name === "Contact Us - Dark") {
      return (
        <ContactUsDark
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            tertiaryColorContrast: tertiaryColorContrast,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <h1>contact us!</h1>
          <h2>we'd love to hear from you</h2>

          <form>
            <input placeholder="Name" />
            <input placeholder="Email Address" />
            <input placeholder="Phone Number" />
            <textarea placeholder="Message"></textarea>
            <div>
              <label>
                {" "}
                How should we contact you?
                <input type="checkbox" />
                <label>Phone</label>
                <input type="checkbox" />
                <label>Email</label>
              </label>
            </div>
            <div>
              <input type="radio" />
              <label>Agree to be contacted?</label>
            </div>
          </form>
          <p>
            <span id="icon">&#128382;</span>
            <span>phone</span>
            <span>(917) 867-5309</span>
            <span id="icon">&#x2709;</span>
            <span>email</span>
            <span>peter@peter.com</span>
          </p>
        </ContactUsDark>
      );
    } else if (form.name === "Login - with OAuth") {
      return (
        <OauthLogin
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <div className="login-container">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <div className="oauth-buttons">
              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon-svg"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <p className="btn-text">Login with Google</p>
              </div>
              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon-svg"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/036-facebook.png"
                  />
                </div>
                <p className="btn-text">Login with Facebook</p>
              </div>
            </div>
          </div>
        </OauthLogin>
      );
    } else if (form.name === "Generic Form") {
      return (
        <GenericForm
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <form>
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="insertfieldvalue">Type something here:</label>
              <input
                defaultValue="insert field value"
                id="inputField"
                placeholder="Type something here"
                style={{ border: "2px solid tertiaryColor" }}
              />
            </div>
            <div id="checkboxes">
              <label htmlFor="checkbox">
                I am a checkbox button
                <input type="checkbox" id="checkbox" />
              </label>
              <label htmlFor="checkbox">
                You can pick multiple checkboxes
                <input type="checkbox" id="checkbox" />
              </label>
            </div>
            <div id="radios">
              <label htmlFor="radio1">
                I am a radio button
                <input type="radio" id="radio1" name="radio" />
              </label>
              <label htmlFor="radio2">
                You can only choose one radio button!
                <input type="radio" id="radio2" name="radio" />
              </label>
            </div>
            <button>Submit</button>
          </form>
        </GenericForm>
      );
    } else if (form.name === "Checkout - Payment") {
      return (
        <PaymentForm
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <h1>Payment Details</h1>
          <p style={{ fontStyle: "italic" }}>
            note: you may see "automatic credit card filling" errors until you implement a secure
            payment system
          </p>
          <div className="form-row">
            <label htmlFor="card-number">Card Number</label>

            <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
          </div>

          <div className="form-row">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input type="text" id="expiry-date" placeholder="MM / YY" />
          </div>

          <div className="form-row">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="123" />
          </div>

          <div className="form-row">
            <label htmlFor="name">Cardholder Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>

          <button className="submit-button">Submit Payment</button>
        </PaymentForm>
      );
    } else if (form.name === "Checkout - Address") {
      return (
        <AddressForm
          colors={{
            primary: primaryColor,
            primaryColorContrast: primaryColorContrast,
            secondary: secondaryColor,
            secondaryColorContrast: secondaryColorContrast,
            tertiary: tertiaryColor,
            bg: bgColor,
            bgColorContrast: bgColorContrast,
          }}
        >
          <h1>Address Details</h1>

          <div className="form-row">
            <label htmlFor="street">Street Address</label>
            <input type="text" id="street" placeholder="123 Main St" />
          </div>

          <div className="form-row">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="Enter your city" />
          </div>

          <div className="form-row">
            <label htmlFor="state">State</label>
            <select id="state">
              <option defaultValue="" disabled>
                Select State
              </option>
              <option defaultValue="AL">Alabama</option>
              <option defaultValue="AK">Alaska</option>
              <option defaultValue="AZ">Arizona</option>
              <option defaultValue="AR">Arkansas</option>
              <option defaultValue="CA">California</option>
              <option defaultValue="CO">Colorado</option>
              <option defaultValue="CT">Connecticut</option>
              <option defaultValue="DE">Delaware</option>
              <option defaultValue="FL">Florida</option>
              <option defaultValue="GA">Georgia</option>
              <option defaultValue="HI">Hawaii</option>
              <option defaultValue="ID">Idaho</option>
              <option defaultValue="IL">Illinois</option>
              <option defaultValue="IN">Indiana</option>
              <option defaultValue="IA">Iowa</option>
              <option defaultValue="KS">Kansas</option>
              <option defaultValue="KY">Kentucky</option>
              <option defaultValue="LA">Louisiana</option>
              <option defaultValue="ME">Maine</option>
              <option defaultValue="MD">Maryland</option>
              <option defaultValue="MA">Massachusetts</option>
              <option defaultValue="MI">Michigan</option>
              <option defaultValue="MN">Minnesota</option>
              <option defaultValue="MS">Mississippi</option>
              <option defaultValue="MO">Missouri</option>
              <option defaultValue="MT">Montana</option>
              <option defaultValue="NE">Nebraska</option>
              <option defaultValue="NV">Nevada</option>
              <option defaultValue="NH">New Hampshire</option>
              <option defaultValue="NJ">New Jersey</option>
              <option defaultValue="NM">New Mexico</option>
              <option defaultValue="NY">New York</option>
              <option defaultValue="NC">North Carolina</option>
              <option defaultValue="ND">North Dakota</option>
              <option defaultValue="OH">Ohio</option>
              <option defaultValue="OK">Oklahoma</option>
              <option defaultValue="OR">Oregon</option>
              <option defaultValue="PA">Pennsylvania</option>
              <option defaultValue="RI">Rhode Island</option>
              <option defaultValue="SC">South Carolina</option>
              <option defaultValue="SD">South Dakota</option>
              <option defaultValue="TN">Tennessee</option>
              <option defaultValue="TX">Texas</option>
              <option defaultValue="UT">Utah</option>
              <option defaultValue="VT">Vermont</option>
              <option defaultValue="VA">Virginia</option>
              <option defaultValue="WA">Washington</option>
              <option defaultValue="WV">West Virginia</option>
              <option defaultValue="WI">Wisconsin</option>
              <option defaultValue="WY">Wyoming</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="zip">Zip Code</label>
            <input type="text" id="zip" placeholder="12345" minLength="5" maxLength="5" />
          </div>

          <button className="submit-button">Submit Address</button>
        </AddressForm>
      );
    }
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "unset", margin: "auto" }}>
      {formPage}
    </div>
  );
};

export default FormPage;
