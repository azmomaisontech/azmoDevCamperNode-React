const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Mongoose Object ID error
  if (error.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  //Duplicate field value error
  if (error.code === 11000) {
    const message = "Item Already Exist";
    error = new ErrorResponse(message, 400);
  }

  //Empty important fields error
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors).map(value => value.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
