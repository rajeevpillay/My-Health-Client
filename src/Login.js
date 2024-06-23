import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 3px 6px rgba(0,0,0,0.16)", // Manually defined box shadow
}));

const Background = styled(Box)({
  background: "linear-gradient(135deg, #6D5BBA 0%, #8D58BF 100%)",
  height: "110vh",
  display: "flex",
  margin: 0,
  justifyContent: "center",
  alignItems: "center",
});

const LoginButton = styled(Button)({
  background: "linear-gradient(90deg, #3b82f6, #9333ea)",
  color: "#fff",
  padding: "10px 20px",
  width: "100%",
});

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Background style={{ backgroundColor: "#fffaf0" }}>
      <Container maxWidth="xs">
        <Form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="#" variant="body2" style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Link>
          <LoginButton type="submit" variant="contained" fullWidth>
            LOGIN
          </LoginButton>
          <Typography variant="body2" style={{ marginTop: "10px" }}>
            Not a member? <Link href="#">Signup now</Link>
          </Typography>
        </Form>
      </Container>
    </Background>
  );
}

export default Login;
