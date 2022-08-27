import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Auth = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow={"3px 1px 20px #2B34D9"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={2}
            textAlign="center"
            color={"#2B34D9"}
          >
            {isSignup ? "Register" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              required={true}
              name="name"
              onChange={handleChange}
              value={inputs.name}
              label="Name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            label="Email"
            margin="normal"
          />
          <TextField
            sx={{
              color: "#4FF5F3",
            }}
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            label="Password"
            margin="normal"
          />
          {!isSignup && (
            <Button
              sx={{
                borderRadius: 2,
                marginTop: 2,
                boxShadow: "2px 3px 20px #2B34D9",
                ":hover": {
                  background: "#4FF5F3",
                  color: "#010305",
                },
              }}
              variant="contained"
              type="submit"
            >
              SIGN IN
            </Button>
          )}
          {isSignup && (
            <Button
              sx={{
                borderRadius: 2,
                marginTop: 2,
                boxShadow: "2px 3px 20px #2B34D9",
                ":hover": {
                  background: "#4FF5F3",
                  color: "#010305",
                },
              }}
              variant="contained"
              type="submit"
            >
              SIGN UP
            </Button>
          )}
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 2, marginTop: 2 }}
          >
            Change to {isSignup ? "SIGN IN" : "SIGN UP"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
