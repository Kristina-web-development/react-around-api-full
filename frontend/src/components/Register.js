import React from "react";
import AuthorizationForm from "./AuthForm";
import { signUp } from "../utils/auth";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const callback = () => {
    history.push("/signin");
  };

  return (
    <AuthorizationForm
      registerCallback={callback}
      onSubmit={signUp}
      formType="signup"
    />
  );
}

export default Register;
