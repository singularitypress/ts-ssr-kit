import * as express from "express";
import renderer from "./helpers/renderer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req: any, res: any) => {
  res.send(renderer);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
