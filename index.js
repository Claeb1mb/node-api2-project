const http = require("express");
const expressServer = require("./express");

const server = express();
const port = 3000;

server.use(express.json());
server.use(expressServer);

server.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
