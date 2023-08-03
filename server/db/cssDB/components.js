let bgColor;
let primaryColor;
let secondaryColor;
let tertiaryColor;

const components = [
  //NAVBARS
  {
    type: "navbar",
    name: "Simple",
  },
  {
    type: "navbar",
    name: "Dropdown",
  },
  {
    type: "navbar",
    name: "Gradient Background",
  },
  {
    type: "navbar",
    name: "Border Bottom",
  },
  {
    type: "navbar",
    name: "Border with Login",
  },

  //FORMS

  {
    type: "form",
    name: "Contact Us - Light",
    //front end preview window html
    htmlText: `
    <style>
    .formComponent {
      background-color: bgColor26;
      color: bgColorContrast;
      border: 2px solid primaryColor;
      border-radius: 2px;
      width: 50vw;
      min-height: 45vh;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 2rem 2rem 1fr;
      grid-column-gap: 4px;
      grid-row-gap: 4px;
    }
  
    .formComponent > h1 {
      grid-column: 1/ span 2;
      grid-row: 1;
      text-align: center;
      font-size: calc(12px + 0.5vw);
      margin-top: 4px;
      padding: 0;
    }
  
    .formComponent > h2 {
      grid-column: 1/ span 2;
      grid-row: 2;
      text-align: center;
      font-size: calc(8px + 0.5vw);
      margin: 0;
      padding: 0;
    }
  
    .formComponent > form {
      width: 80%;
      grid-column: 1;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      padding: 1rem;
    }
    .formComponent > form > input{
      border-radius: 4px; 
      border:2px solid primaryColor;
    }
    .formComponent > form > textarea{
      border-radius: 4px; 
      border:2px solid primaryColor;
      height: 2rem;
      resize: vertical; 
    }

    .formComponent > p {
      grid-column: 2;
      grid-row: 3/ span 3;
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
  
    .formComponent > p > span {
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
      .formComponent {
        width: 100%;
      }}
  </style>
  
  <div class="formComponent">
    <h1>contact us!</h1>
    <h2>we'd love to hear from you</h2>
  
    <form>
      <input placeholder="Name"/>
      <input placeholder="Email Address"/>
      <input placeholder="Phone Number"/>
      <textarea placeholder="Message">
      </textarea>
      <div>
      <label> How should we contact you?
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
  </div>

    `,
  },
  {
    type: "form",
    name: "Contact Us - Dark",
    htmlText: `
    <style>
    .formComponent {
      background-color: secondaryColor;
      color: secondaryColorContrast;
      border: 2px solid primaryColor;
      border-radius: 2px;
      width: 50vw;
      min-height: 45vh;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 2rem 2rem 1fr;
      grid-column-gap: 4px;
      grid-row-gap: 4px;
    }
  
    .formComponent > h1 {
      grid-column: 1/ span 2;
      grid-row: 1;
      text-align: center;
      font-size: calc(12px + 0.5vw);
      margin-top: 4px;
      padding: 0;
      color: white;
    }
  
    .formComponent > h2 {
      grid-column: 1/ span 2;
      grid-row: 2;
      text-align: center;
      font-size: calc(8px + 0.5vw);
      margin: 0;
      padding: 0;

    }
  
    .formComponent > form {
      width: 80%;
      grid-column: 1;
      grid-row: 3/ span 3;
      font-size: calc(8px + 0.5vw);
      padding: 1rem;
    }
    .formComponent > form > input{
      border-radius: 4px; 
      border:2px solid primaryColor;
    }
    .formComponent > form > textarea{
      border-radius: 4px; 
      border:2px solid primaryColor;
      height: 2rem;
      resize: vertical; 
    }

    .formComponent > p {
      grid-column: 2;
      grid-row: 3/ span 3;
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
  
    .formComponent > p > span {
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
      .formComponent {
        width: 100%;
      }}
  </style>
  
  <div class="formComponent">
    <h1>contact us!</h1>
    <h2>we'd love to hear from you</h2>
  
    <form>
      <input placeholder="Name"/>
      <input placeholder="Email Address"/>
      <input placeholder="Phone Number"/>
      <textarea placeholder="Message">
      </textarea>
      <div>
      <label> How should we contact you?
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
  </div>

    `,
  },
  {
    type: "form",
    name: "Login - with OAuth",
    htmlText: `
    <style>  
    .loginWithOauth {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      min-width: 40vw;
      max-width: 60vw;
    }
  
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
      border: 1px solid tertiaryColor;
      border-radius: 4px;
    }
  
    .login-container input[type="text"]:focus,
    .login-container input[type="password"]:focus {
      border: 2px solid secondaryColor;
      outline: none;
    }
  
    .login-container button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: secondaryColor;
      color: secondaryColorContrast;
      border: 2px solid secondaryColor;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .login-container button:hover {
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: 2px solid primaryColor;
    }
  
    .oauth-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .google-btn {
      margin: 25px;
      width: 80%;
      min-width: 184px;
      max-width: 184px;
      height: 42px;
      background-color: #fcfcfc;
      border-radius: 2px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .2);
      cursor: pointer;
      user-select: none;
      transition: all 400ms ease 0s;
      display: flex;
    }
  
    .google-btn .google-icon-wrapper {
      position: absolute;
      margin-top: 1px;
      margin-left: 1px;
      width: 40px;
      height: 40px;
      border-radius: 2px;
      user-select: none;
    }
  
    .google-btn .google-icon-svg {
      position: absolute;
      margin-top: 11px;
      margin-left: 11px;
      width: 18px;
      height: 18px;
      user-select: none;
    }
  
    .google-btn .btn-text {
      float: right;
      margin: 11px 14px 40px 40px;
      color: #757575;
      font-size: 11px;
      align-items: center;
      letter-spacing: .2px;
      font-family: Roboto;
      user-select: none;
    }
  
    .google-btn:hover {
      box-shadow: 0 3px 8px secondaryColor40;
    }
    @media screen and (max-width: 768px) {
      .google-btn {
        margin: 10px 25px; /* Adjusted */
      }
  
      .oauth-buttons {
        flex-direction: column; /* Added */
        align-items: center; /* Added */
      }
    }
  </style>
  
  <div class="loginWithOauth">
    <div class="login-container">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <div class="oauth-buttons">
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
          </div>
          <p class="btn-text"><b>Sign in with Google</b></p>
        </div>
        <div class="google-btn">
          <div class="google-icon-wrapper">
            <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/9/91/036-facebook.png" />
          </div>
          <p class="btn-text"><b>Sign in with Facebook</b></p>
        </div>
      </div>
    </div>
  </div>
  
    
    `,
  },

  {
    type: "form",
    name: "Generic Form",
    htmlText: `
    <style>
    #genericform > form {
      font-size: calc(12px + 0.5vw);
      background-color: primaryColor;
      color: primaryColorContrast;

      padding: 1rem;
    }
   #genericform > form > label {
      font-size: calc(12px + 0.5vw);
      color: white;
    }
    #genericform > form > input {
      color: white;
      border-radius: 0.5rem; 
      outline: none; 
      padding: 0.5rem; 
    }

    #genericform > form > #checkboxes{
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    #genericform > form > #radios{
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    #genericform > form > button{
      font-size: calc(12px + 0.5vw)
      border: none; 
      background-color: bgColor; 
      color: bgColorContrast;
      padding: 0.5rem 1rem; 
      border-radius: 0.25rem; 
    }

    #genericform > form > div > label {
      color: white;
    }
    
    #genericform > form > div > input {
      color: black;
    }
   #genericform > form >  button:hover{
      outline: 2px solid white; 
      background-color: bgColor40; 
      color: bgColorContrast;
      padding: 0.5rem 1rem; 
      border-radius: 0.25rem; 
      cursor: pointer;
    }
    </style>
    <div id="genericform">
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="insertfieldvalue">Type something here:</label>
          <input value="insert field value" id="inputField" placeholder="Type something here" style="border: 2px solid tertiaryColor">
        </div>
        <div id="checkboxes">
        <label for="checkbox">I am a checkbox button
          <input type="checkbox" id="checkbox"></label>
          <label for="checkbox">You can pick multiple checkboxes
          <input type="checkbox" id="checkbox"></label>
        </div>
        <div id="radios">
        <label for="radio1">I am a radio button
        <input type="radio" id="radio1" name="radio"></label>
        <label for="radio2">You can only choose one radio button!
        <input type="radio" id="radio2" name="radio"></label>
      </div>
        <button >
          Submit
        </button>
      </form>
    </div>
    `,
  },

  {
    type: "form",
    name: "Checkout - Payment",
    htmlText: `
    <style>
    .payment-form {
      min-width: 40vw;
      max-width: 60vw;
      margin: 0 auto;
      padding: 1rem;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
    
    .payment-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .form-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
    
    .form-row label {
      font-weight: bold;
    }
    
    .form-row input[type="text"] {
      padding: .5rem;
      border: 2px solid secondaryColor;
      border-radius: 4px;
    }
    
    .submit-button {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    
    .submit-button:hover {
      background-color: #333;
      color: black;

    }

    </style>
    <div class="payment-form">
  <h1>Payment Details</h1>
  
  <div class="form-row">
    <label for="card-number">Card Number</label>

    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
  </div>
  
  <div class="form-row">
    <label for="expiry-date">Expiry Date</label>
    <input type="text" id="expiry-date" placeholder="MM / YY" />
  </div>
  
  <div class="form-row">
    <label for="cvv">CVV</label>
    <input type="text" id="cvv" placeholder="123" />
  </div>
  
  <div class="form-row">
    <label for="name">Cardholder Name</label>
    <input type="text" id="name" placeholder="John Doe" />
  </div>
  
  <button class="submit-button">Submit Payment</button>
</div>

    
`,
  },
  {
    type: "form",
    name: "Checkout - Address",
    htmlText: `
    <style>
    .payment-form {
      min-width: 40vw;
      max-width: 60vw;
      margin: 0 auto;
      padding: 1rem;
      background-color: bgColor;
      color: bgColorContrast;
      border-radius: 4px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
    }
  
    .payment-form h1 {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .form-row {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }
  
    .form-row label {
      font-weight: bold;
    }
  
    .form-row input[type="text"],
    .form-row select {
      padding: 10px;
      border: 2px solid secondaryColor;
      border-radius: 4px;
    }
  
    .form-row select {
      appearance: none;
      background-color: #fff;
    }
  
    .submit-button {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: tertiaryColor;
      color: tertiaryColorContrast;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .submit-button:hover {
      background-color: #333;
    }
  </style>
  
  <div class="payment-form">
    <h1>Address Details</h1>
  
    <div class="form-row">
      <label for="street">Street Address</label>
      <input type="text" id="street" placeholder="123 Main St" />
    </div>
  
    <div class="form-row">
      <label for="city">City</label>
      <input type="text" id="city" placeholder="Enter your city" />
    </div>
  
    <div class="form-row">
      <label for="state">State</label>
      <select id="state">
        <option value="" disabled selected>Select State</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    </div>
  
    <div class="form-row">
      <label for="zip">Zip Code</label>
      <input type="text" id="zip" placeholder="12345" minlength="5" maxlength="5" />
    </div>
  
    <button class="submit-button">Submit Address</button>
  </div>
  
  `,
  },

  //TITLES

  {
    type: "title",
    name: "Title & Subtitle",
  },
  {
    type: "title",
    name: "Text Shadow",
  },
  {
    type: "title",
    name: "Uppercase",
  },
  {
    type: "title",
    name: "Dark Mode",
  },
  {
    type: "title",
    name: "Underline",
  },

  {
    type: "title",
    name: "Top Border",
  },
  {
    type: "title",
    name: "Border Gradient",
  },

  //BUTTONS
  {
    type: "button",
    name: "Basic Color Buttons",
    htmlText: `
    <style>
    .mui-style-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
      transition: background-color 0.3s ease;
    }
  
    .mui-style-button:hover {
      background-color: #888;
    }
  
    .mui-style-primary {
      background-color: primaryColor;
    }
  
    .mui-style-secondary {
      background-color: secondaryColor;
    }
  
    .mui-style-tertiary {
      background-color: tertiaryColor;
    }
  
    .mui-style-bg {
      background-color: bgColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <button class="mui-style-button mui-style-primary">
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-secondary">
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-tertiary">
      Click Me
    </button>
  </div>
  
  `,
  },
  {
    type: "button",
    name: "Mixed Bag",
    htmlText: `
    <style>

    #basic-text-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: transparent;
      color: primaryColor;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 0;
      cursor: pointer;
      margin: 2px;
    }

    #basic-contained-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: primaryColor;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
    }

    #basic-outlined-button{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      background-color: transparent;
      color: primaryColor;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: 2px solid primaryColor;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
    }
  </style>
  <div style="display:flex; justify-content: space-around;">
  <button id="basic-text-button">
    Click Me
  </button>

    <button id="basic-outlined-button">
      Click Me
    </button>

    <button id="basic-contained-button">
    Click Me
  </button>
  
  </div>
  `,
  },
  {
    type: "button",
    name: "Bold Buttons",
    htmlText: `
    <style>
    .custom-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .custom-button:hover {
      background-color: #888;
    }
  
    .custom-button-primary {
      color: #fff;
      background-color: primaryColor;
    }
  
    .custom-button-secondary {
      color: #fff;
      background-color: secondaryColor;
    }
  
    .custom-button-tertiary {
      color: #fff;
      background-color: tertiaryColor;
    }
  
    .custom-button-outline {
      color: primaryColor;
      background-color: transparent;
      border: 2px solid primaryColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <a class="custom-button custom-button-primary" href="#">Primary</a>
    <a class="custom-button custom-button-secondary" href="#">Secondary</a>
    <a class="custom-button custom-button-tertiary" href="#">Tertiary</a>
    <a class="custom-button custom-button-outline" href="#">Outline</a>
  </div>
  
  `,
  },
  {
    type: "button",
    name: "Social Media Icons",
    htmlText: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <style>
      .social-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px
        max-width: 50px;
        min-height: 30px
        max-height: 50px;
        color: #fff;
        font-size: calc(8px + 0.5vw);
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 2px;
        transition: background-color 0.3s ease;
      }
    
      .social-button:hover {
        background-color: bgColor;
        outline: 1px solid primaryColor;

      }
    
      .facebook-button {
        background-color: #3b5998;
      }
    
      .twitter-button {
        background-color: #1da1f2;
      }
    
      .instagram-button {
        background-color: #e4405f;
      }
    
      .linkedin-button {
        background-color: #0077b5;
      }
    </style>
    
<div style="display: flex; justify-content: space-around;">
<button class="social-button facebook-button">
  <i class="fab fa-facebook-f"></i>
</button>

<button class="social-button twitter-button">
  <i class="fab fa-twitter"></i>
</button>

<button class="social-button instagram-button">
  <i class="fab fa-instagram"></i>
</button>

<button class="social-button linkedin-button">
  <i class="fab fa-linkedin-in"></i>
</button>
</div>
    `,
  },
  {
    type: "button",
    name: "Icon Buttons",
    htmlText: `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <style>
      .mui-style-icon-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px
        max-width: 50px;
        min-height: 30px
        max-height: 50px;
        color: #fff;
        font-size: calc(8px + 0.5vw);
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 2px;
        transition: background-color 0.3s ease;
      }
    
      .mui-style-icon-button:hover {
        background-color: #888;
      }
    
      .mui-style-primary {
        background-color: primaryColor;
      }
    
      .mui-style-secondary {
        background-color: secondaryColor;
      }
    
      .mui-style-tertiary {
        background-color: tertiaryColor;
      }
    
      .mui-style-bg {
        background-color: bgColor;
      }
    </style>
    
    <div style="display: flex; justify-content: space-around;">
      <button class="mui-style-icon-button mui-style-primary">
        <span class="material-icons">home</span>
      </button>
    
      <button class="mui-style-icon-button mui-style-secondary">
        <span class="material-icons">favorite</span>
      </button>
    
      <button class="mui-style-icon-button mui-style-tertiary">
        <span class="material-icons">settings</span>
      </button>
    </div>
    
  `,
  },
  {
    type: "button",
    name: "Disabled Icon Buttons",
    htmlText: `
    <style>
    .mui-style-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15vw;
      max-width: 100px;
      height: 10vh;
      max-height: 50px;
      color: #fff;
      font-size: calc(8px + 0.5vw);
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 2px;
      transition: background-color 0.3s ease;
      border: 2px solid transparent;
    }
  
    .mui-style-button:hover {
      background-color: #888;
    }
  
    .mui-style-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .mui-style-primary {
      background-color: primaryColor;
      border-color: secondaryColor;
    }
  
    .mui-style-secondary {
      background-color: secondaryColor;
      border-color: tertiaryColor;
    }
  
    .mui-style-tertiary {
      background-color: tertiaryColor;
      border-color: primaryColor;
    }
  
    .mui-style-bg {
      background-color: bgColor;
      border-color: bgColor;
    }
  </style>
  
  <div style="display: flex; justify-content: space-around;">
    <button class="mui-style-button mui-style-primary" disabled>
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-secondary" disabled>
      Click Me
    </button>
  
    <button class="mui-style-button mui-style-tertiary" disabled>
      Click Me
    </button>
  </div>
  
  `,
  },

  //CARDS
  {
    type: "card",
    name: "Product - Generic",
  },
  {
    type: "card",
    name: "Product - Gradient",
  },
  {
    type: "card",
    name: "Product Card Subtle",
  },
  {
    type: "card",
    name: "Social Media Photo",
  },
  {
    type: "card",
    name: "Photo Card",
  },

  //SIDENAV
  {
    type: "sideNav",
    name: "Side Nav",
  },
  {
    type: "sideNav",
    name: "SideNav 2",
  },
  {
    type: "sideNav",
    name: "SideNav 3",
  },
  {
    type: "sideNav",
    name: "Dropdown SideNav",
  },
];

module.exports = components;
