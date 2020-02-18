const advancedQuery = (model, populate) => async (req, res, next) => {
  let query;
  //Create an object of the req.query
  let reqQuery = { ...req.query };

  //Remove certain fields from the req.query list
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach(params => delete reqQuery[params]);

  //converting to Json string
  let queryStr = JSON.stringify(reqQuery);

  //Creating operators like $gte, $lte
  queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);

  //querying the database
  query = model.find(JSON.parse(queryStr));

  //Select Field
  if (req.query.select) {
    let fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //Sort Field
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //Pagination
  const page = parseInt(req.query.page || 1, 10);
  const limit = parseInt(req.query.limit || 4, 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  //Sending a response to the client
  const result = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedQuery = {
    success: true,
    count: result.length,
    pagination,
    data: result
  };

  next();
};

module.exports = advancedQuery;
