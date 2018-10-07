import * as express from "express";
import { renderer, setStore } from "./helpers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("*", (req: any, res: any) => {
  const store = setStore();

  res.send(renderer(req, store));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
