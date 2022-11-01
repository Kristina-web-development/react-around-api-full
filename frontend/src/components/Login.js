import React from "react";
import AuthorizationForm from "./AuthForm";
import { signIn } from "../utils/auth";

function Login({ onLogin }) {
  const callback = () => {
    onLogin();
  };

  return (
    <AuthorizationForm
      loginCallback={callback}
      onSubmit={signIn}
      formType="signin"
    />
  );
}

export default Login;
