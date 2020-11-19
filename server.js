const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
require("colors");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const bootcampsRoute = require("./routes/bootcamps");
const coursesRoute = require("./routes/courses");
const authsRoute = require("./routes/auths");
const usersRoute = require("./routes/users");
const reviewsRoute = require("./routes/reviews");

//load all config var
dotenv.config({ path: "./config/config.env" });

//Load Database
connectDB();

//Body parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//middleware dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//File upload
app.use(fileupload());

//Sanitize Data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Protect XSS
app.use(xss());

//Limit the number of request per time
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 1000 requests per windowMs
});

//  apply to all requests
app.use(limiter);

//Prevent HTTP params polution
app.use(hpp());

//Enable Cors for Public Access
app.use(cors());

//Creating a static folder
app.use("/uploads", express.static("uploads"));

// Mount routers
app.use("/api/v1/bootcamps", bootcampsRoute);
app.use("/api/v1/courses", coursesRoute);
app.use("/api/v1/auth", authsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/reviews", reviewsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set statuc folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

//Load errorHandler
app.use(errorHandler);

//declare env var
const PORT = process.env.PORT || 6000;
const MODE = process.env.NODE_ENV;

//load server
const server = app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`));

//Unhandled Promise Rejection Error
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Stop server and exit
  server.close(() => process.exit(1));
});

//For test
module.exports = server;
