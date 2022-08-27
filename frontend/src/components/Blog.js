import {
  Avatar,
  Card,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useStyles } from "./utils";
import axios from "axios";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://backend-tachyon.herokuapp.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/").then(() => navigate("/blogs")));
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: " auto",
          background: "#21212c",
          color: "#fff",
          mt: 2,
          padding: 2,
          boxShadow: "3px 1px 20px #2B34D9",
          ":hover": {
            boxShadow: "5px 10px 20px #2B34D9",
          },
          borderRadius: 3,
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton
              onClick={handleEdit}
              sx={{ marginLeft: "auto", color: "lightgreen" }}
            >
              <EditTwoToneIcon />
            </IconButton>
            <IconButton onClick={handleDelete} sx={{ color: "red" }}>
              <DeleteSweepTwoToneIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader={Date.UTC()}
        />
        <CardMedia
          sx={{
            borderRadius: 2,
          }}
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            <b>{userName}</b> {": "}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
