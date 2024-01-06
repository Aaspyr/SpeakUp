const express = require("express");
const morgan = require("morgan");
const cardsRouter = require("./routes/cardsRoutes");
const usersRouter = require("./routes/usersRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");

const app = express();

//I MIDDLEWARES

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, REQUEST"
  );
  next();
});
//III ROUTES
app.use("/api/v1/cards", cardsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "404 Not Found",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
