require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;
const server = require("http").createServer(app);

//#region body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//#endregion body-parser

const booksRoute = require("./src/routes/books");
const membersRoute = require("./src/routes/members");
const transactionsRoute = require("./src/routes/transactions");

app.use("/books", booksRoute);
app.use("/members", membersRoute);
app.use("/transactions", transactionsRoute);

app.get("/", (req, res) => {
  const data = {
    success: true,
    message: "backend is running well",
  };
  return res.json(data);
});

server.listen(port, () => {
  console.log(`app running on port ${port}`);
});

//#region swagger
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./src/swagger/swaggerOptions");
const algoritma = require("./algoritma");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
//#endregion swagger 

algoritma()
