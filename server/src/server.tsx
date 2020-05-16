import * as express from "express";
import * as compression from "compression";
import { renderer, setStore } from "./helpers";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(compression());
app.use(express.static("public"));

app.get("*", (req: any, res: any) => {
  const store = setStore();

  res.send(renderer(req, store));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
