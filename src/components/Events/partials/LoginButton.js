import React from "react";
import { FaGoogle } from "react-icons/fa";
import { LoginButton as StyledButton } from "../styles";

const LoginButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <FaGoogle size={15} style={{ marginRight: "10px" }} />
      Login com Google
    </StyledButton>
  );
};

export default LoginButton;