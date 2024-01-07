// import React from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
import styled from "styled-components";
import LoginForm from "../features/LoginForm";
import HomepageLogo from "../ui/HomepageLogo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2 rem;
  background-color: var(--color-brand-1000);
`;
function Login() {
  return (
    <LoginLayout>
      <HomepageLogo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
