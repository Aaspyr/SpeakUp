import { useState } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import FormRowVertical from "../ui/FormRowVertical";
import Form from "../ui/Form";
import { useNavigate } from "react-router-dom";
const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2 rem;
  background-image: linear-gradient(
    110.1deg,
    rgba(60, 58, 115, 1) 50%,
    rgba(198, 55, 160, 1) 138.2%
  );
`;

// Main component
const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint = await fetch(
        "http://127.0.0.1:3000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await apiEndpoint.json();
      if (result.status === "success") {
        navigate("/");
      }
      console.log("User registered successfully:", result);
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error
    }
  };

  return (
    <SignUpLayout>
      <div>
        <FormTitle>Sign Up</FormTitle>
        <Form onSubmit={handleSubmit}>
          <FormRowVertical>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <Label htmlFor="passwordConfirm">Confirm your password</Label>
            <Input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledButton type="submit">Sign Up</StyledButton>
          </FormRowVertical>
        </Form>
      </div>
    </SignUpLayout>
  );
};

export default SignUpForm;
