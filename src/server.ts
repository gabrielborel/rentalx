import express from "express";
import { categoriesRoutes } from "./routes/categories.route";

const $PORT = 3333;
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello Ignite" });
});

app.use(express.json());
app.use("/categories", categoriesRoutes);

app.listen($PORT, () => console.log(`Server is running on port ${$PORT}`));
