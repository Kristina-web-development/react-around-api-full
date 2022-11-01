import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function AuthorizationForm({ formType, onSubmit, loginCallback }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [headerText, setHeaderText] = useState("Sign Up");
  const [hint, setHint] = useState("");
  const currentLocation = useLocation();
  const [showMessage, setShowMessage] = useState({
    status: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  const hintRedirect = () => {
    if (currentLocation.pathname.includes("signin")) {
      history.push("/signup");
    } else if (currentLocation.pathname.includes("signup")) {
      history.push("/signin");
    }
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
  };

  const handleChangePassowrd = (event) => {
    event.preventDefault();
    const password = event.target.value;
    setPassword(password);
  };

  const handlePopupClose = () => {
    setShowMessage({ status: false, message: "" });
  };

  function handleFormSubmit(e) {
    e.preventDefault();

    onSubmit({ email, password })
      .then(() => {
        if (formType === "signup") {
          setShowMessage({
            status: true,
            message: "Success! You have now been registered.",
          });
          setIsSuccess(true);
        }

        if (formType === "signin") {
          loginCallback();
        }
      })
      .catch(() => {
        setShowMessage({
          status: true,
          message: "Oops, something went wrong! Please try again.",
        });
      });
  }

  useEffect(() => {
    switch (formType) {
      case "signup":
        setHeaderText("Sign Up");
        setHint("Already a member? Log in here!");
        break;
      case "signin":
        setHeaderText("Log in");
        setHint("Not a member yet? Sign up here!");
        break;
      default:
        setHeaderText("Sign Up");
        setHint("Not a member yet? Sign up here!");
        break;
    }
  }, [formType]);

  return (
    <>
      <form
        className="form popup__form"
        name="auth_form"
        onSubmit={handleFormSubmit}
      >
        <h2 className="auth_header">{headerText}</h2>
        <fieldset className="form__fieldset">
          <input
            value={email}
            onChange={handleChangeEmail}
            className="form__input-auth"
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="name-error form__input-error"></span>
          <input
            value={password}
            onChange={handleChangePassowrd}
            className="form__input-auth"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="job-error form__input-error"></span>

          <button type="submit" className="form__button-auth">
            {headerText}
          </button>
          <div className="auth__footer-hint" onClick={hintRedirect}>
            <p>{hint}</p>
          </div>
        </fieldset>
      </form>

      {showMessage && (
        <InfoTooltip
          message={showMessage.message}
          name="auth"
          isOpen={showMessage.status}
          isSuccess={isSuccess}
          onClose={handlePopupClose}
        />
      )}
    </>
  );
}

export default AuthorizationForm;
