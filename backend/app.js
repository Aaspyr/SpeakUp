const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cardsRouter = require("./routes/cardsRoutes");
const usersRouter = require("./routes/usersRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const AppError = require("./utils/appError");
const errorHandler = require("./controllers/errorController");
const hpp = require("hpp");

const app = express();

//I GLOBAL MIDDLEWARES

//Set Secutity HTTP headers
app.use(helmet());

//Development loggin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from the same AIP
const limiter = rateLimit({
  // 100 request from one ip in 1 hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in one hour",
});
app.use("/api", limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against xss
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "name",
      "cardsCollection",
      "imageCollection",
      "favourites",
      "namePL",
      "cardsCollectionPL",
    ],
  })
);

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

//Test middlewate
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);

  next();
});

//III ROUTES
app.use("/api/v1/cards", cardsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

module.exports = app;
