import  express  from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);



mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.fug6pkv.mongodb.net/BlogApp?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Server is running on port 5000"))
  .catch((e) => console.log(e));

