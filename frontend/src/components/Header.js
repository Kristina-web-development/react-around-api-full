import React from "react";
import logo from "../images/logo.svg";
import { useLocation, useHistory } from "react-router-dom";

export default function Header({ isAuthorized, onLogOut }) {
  const currentPath = useLocation();
  const history = useHistory();

  const hintClick = () => {
    if (currentPath.pathname.includes("signin")) {
      history.push("/signup");
    } else if (currentPath.pathname.includes("signup")) {
      history.push("/signin");
    }
  }

  const UserInfo = () => {
    return (
      <div className="user_menu">
        <p>{localStorage.getItem("userEmail")}</p>
        <div onClick={logOut}>
          <p>Log out</p>
        </div>
      </div>
    );
  };

  const logOut = () => {
    localStorage.clear();

    window.location.reload();
  };

  const CurrentPathHint = () => {
    const path = currentPath.pathname;
    let hintText = "";

    if (path.includes("signin")) {
      hintText = "Sign Up";
    }

    if (path.includes("signup")) {
      hintText = "Log in";
    }

    return (
      <div className="header_hint" onClick={hintClick}>
        <p>{hintText}</p>
      </div>
    )
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      {isAuthorized ? <UserInfo /> : <CurrentPathHint />}
    </header>
  );
}
