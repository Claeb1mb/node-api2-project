const express = require("express");
const postsRouter = require("./Posts/post-router");

const server = express();
const port = 3000;

server.use(express.json());
server.use(postsRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
