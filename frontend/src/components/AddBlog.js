import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  InputLabel,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import axios from "axios";

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
};

const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("https://backend-tachyon.herokuapp.com/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(()=>navigate("/blogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          color="white"
          border={3}
          borderColor="#4FF5F3"
          borderRadius={5}
          boxShadow="2px 3px 20px #2B34D9"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection="column"
          width={"60%"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="outlined"
            margin="normal"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            variant="outlined"
            margin="normal"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            variant="outlined"
            margin="normal"
          />

          <Button
            sx={{
              width: "20%",
              marginLeft: "auto",
              padding: "8px",
              borderRadius: 2,
              marginTop: 2,
              fontWeight: "bold",
              boxShadow: "2px 3px 20px #2B34D9",
              ":hover": {
                background: "#4FF5F3",
                color: "#010305",
              },
            }}
            variant="contained"
            type="submit"
          >
            POST
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
