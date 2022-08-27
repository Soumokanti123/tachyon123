import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});

  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://backend-tachyon.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`https://backend-tachyon.herokuapp.com/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => navigate("/myBlogs/"));
  };
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            color="white"
            border={3}
            borderColor="#4FF5F3"
            borderRadius={5}
            boxShadow="2px 3px 20px #2B34D9"
            padding={3}
            margin={"auto"}
            marginTop={2}
            display="flex"
            flexDirection="column"
            width={"60%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              variant="outlined"
              margin="normal"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
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
      )}
    </div>
  );
};

export default BlogDetail;
