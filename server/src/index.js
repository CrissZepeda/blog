import express from "express";
import config from "./config.js";
import { connectFireBase, disconnectFireBase } from "./database/connection.js";
import postRoutes from "./router/posts.routes.js";
import userRoutes from "./router/users.routes.js";
import commentRoutes from "./router/comments.routes.js";

const app = express();
app.set("port", config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connectFireBase()
//disconnectFireBase()

app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);

app.listen(config.port);
console.log("Server running in port:", config.port);
