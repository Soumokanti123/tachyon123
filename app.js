import  express  from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import "dotenv/config";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);

if(process.env.NODE_ENV == "production"){
  app.use(express.static("frontend/build"));
  const path = require("path");
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  
  })
}

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.fug6pkv.mongodb.net/BlogApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(() => console.log("Server is running on port 5000"))
  .catch((e) => console.log(e));

